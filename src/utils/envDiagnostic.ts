/**
 * Dreampath AI — Vercel Production & Runtime Environment Diagnostic Utility
 *
 * Safely verifies:
 * 1. Vite client build-time environment injection (`import.meta.env`).
 * 2. Vercel `/api/*` serverless routing availability (confirming requests aren't rewritten to index.html).
 * 3. Server-side runtime `GEMINI_API_KEY` availability via `/api/health` (without ever exposing secrets to the browser).
 * 4. Client Firebase configuration initialization.
 */

import { auth } from "../services/firebase";

export interface EnvCheckItem {
  name: string;
  scope: "client" | "server";
  ok: boolean;
  detail: string;
}

export interface RuntimeDiagnosticReport {
  ok: boolean;
  timestamp: string;
  summary: string;
  clientBuild: {
    mode: string;
    isProd: boolean;
    isDev: boolean;
    baseUrl: string;
    injectedViteKeys: string[];
  };
  serverRuntime?: {
    platform: "vercel" | "node";
    vercelEnv: string | null;
    nodeEnv: string;
    geminiConfigured: boolean;
    misconfiguredClientKeyOnly: boolean;
  };
  checks: EnvCheckItem[];
  recommendations: string[];
}

/**
 * Verifies that all required runtime environment variables and Vercel serverless endpoints
 * are properly injected and accessible in production without exposing secret values.
 */
export async function verifyVercelRuntimeEnvironment(
  healthEndpoint = "/api/health"
): Promise<RuntimeDiagnosticReport> {
  const envObj = (import.meta as any).env || {};
  const injectedViteKeys = Object.keys(envObj).filter(
    (key) => key.startsWith("VITE_") && Boolean(String(envObj[key] ?? "").trim())
  );

  const checks: EnvCheckItem[] = [];
  const recommendations: string[] = [];

  // 1. Check Vite runtime build metadata
  const mode = String(envObj.MODE || "unknown");
  const isProd = Boolean(envObj.PROD);
  const isDev = Boolean(envObj.DEV);
  const baseUrl = String(envObj.BASE_URL || "/");

  checks.push({
    name: "VITE_RUNTIME_BUILD",
    scope: "client",
    ok: mode !== "unknown",
    detail: `Vite runtime active (MODE=${mode}, PROD=${String(isProd)}, BASE_URL=${baseUrl}).`,
  });

  // 2. Warn if someone injected VITE_GEMINI_API_KEY into the public bundle instead of keeping GEMINI_API_KEY server-only
  const hasPublicViteGeminiKey = injectedViteKeys.includes("VITE_GEMINI_API_KEY");
  if (hasPublicViteGeminiKey) {
    recommendations.push(
      "VITE_GEMINI_API_KEY is present in the client build. Prefer setting GEMINI_API_KEY (without VITE_ prefix) in Vercel Environment Variables so Gemini calls stay exclusively server-side."
    );
  }

  // 3. Verify Firebase client configuration is initialized
  const fbOptions = auth?.app?.options || {};
  const firebaseOk = Boolean(fbOptions.apiKey && fbOptions.projectId && fbOptions.authDomain);
  checks.push({
    name: "FIREBASE_CLIENT_CONFIG",
    scope: "client",
    ok: firebaseOk,
    detail: firebaseOk
      ? `Firebase initialized for project "${fbOptions.projectId}".`
      : "Firebase client configuration is missing required fields (apiKey, projectId, authDomain).",
  });

  // 4. Verify Vercel /api/* serverless runtime & server-side GEMINI_API_KEY injection via /api/health
  let serverRuntime: RuntimeDiagnosticReport["serverRuntime"] | undefined;
  try {
    const res = await fetch(healthEndpoint, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const contentType = res.headers.get("content-type") || "";
    if (!res.ok) {
      checks.push({
        name: "API_HEALTH_ENDPOINT",
        scope: "server",
        ok: false,
        detail: `${healthEndpoint} returned HTTP ${res.status}. Ensure /api serverless functions are deployed.`,
      });
      recommendations.push(
        `Verify vercel.json routes /api/* to serverless functions and redeploy (${healthEndpoint} returned HTTP ${res.status}).`
      );
    } else if (!contentType.includes("application/json")) {
      checks.push({
        name: "API_HEALTH_ENDPOINT",
        scope: "server",
        ok: false,
        detail: `${healthEndpoint} returned non-JSON (${contentType || "unknown"}); an SPA rewrite may be intercepting /api/* routes.`,
      });
      recommendations.push(
        'Check vercel.json rewrites to ensure "/api/*" is excluded from the "/index.html" fallback.'
      );
    } else {
      const payload = await res.json();
      const diag = payload?.envDiagnostics;
      const geminiConfigured = Boolean(payload?.geminiConfigured);

      serverRuntime = {
        platform: diag?.platform === "vercel" ? "vercel" : "node",
        vercelEnv: diag?.vercelEnv ?? null,
        nodeEnv: String(diag?.nodeEnv || "unknown"),
        geminiConfigured,
        misconfiguredClientKeyOnly: Boolean(diag?.misconfiguredClientKeyOnly),
      };

      checks.push({
        name: "API_HEALTH_ENDPOINT",
        scope: "server",
        ok: Boolean(payload?.ok),
        detail: `Serverless API reachable on ${serverRuntime.platform} (${serverRuntime.vercelEnv || serverRuntime.nodeEnv}).`,
      });

      checks.push({
        name: "GEMINI_API_KEY (Server-Side)",
        scope: "server",
        ok: geminiConfigured,
        detail: geminiConfigured
          ? "GEMINI_API_KEY is injected and accessible in server/serverless runtime."
          : serverRuntime.misconfiguredClientKeyOnly
            ? "VITE_GEMINI_API_KEY was detected on server, but GEMINI_API_KEY is missing."
            : "GEMINI_API_KEY is NOT accessible at server runtime.",
      });

      if (!geminiConfigured) {
        recommendations.push(
          "In Vercel Dashboard > Project > Settings > Environment Variables, add GEMINI_API_KEY for Production & Preview and trigger a fresh Redeploy."
        );
      }
    }
  } catch (err: any) {
    checks.push({
      name: "API_HEALTH_ENDPOINT",
      scope: "server",
      ok: false,
      detail: `Failed to reach ${healthEndpoint}: ${err?.message || "Network error"}`,
    });
    recommendations.push(
      `Ensure the backend or Vercel deployment is running and ${healthEndpoint} is reachable.`
    );
  }

  const allOk = checks.every((c) => c.ok);
  return {
    ok: allOk,
    timestamp: new Date().toISOString(),
    summary: allOk
      ? "All required client and Vercel server runtime environment variables are verified."
      : "One or more runtime environment checks failed. See checks and recommendations.",
    clientBuild: {
      mode,
      isProd,
      isDev,
      baseUrl,
      injectedViteKeys,
    },
    serverRuntime,
    checks,
    recommendations,
  };
}
