import React from 'react';
import { motion } from 'framer-motion';

export function WhatsAppIcon({ className = "w-5 h-5", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg className={className} fill={color} viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.808 0-3.58-.486-5.127-1.409l-.367-.219-3.81 1 .1-3.712-.24-.382c-1.014-1.613-1.55-3.484-1.55-5.405 0-5.597 4.555-10.152 10.151-10.152 2.71 0 5.258 1.056 7.172 2.971 1.916 1.915 2.971 4.463 2.971 7.172 0 5.597-4.556 10.152-10.152 10.152m0-18.423c-4.561 0-8.271 3.71-8.271 8.271 0 1.761.551 3.481 1.583 4.921l.169.237-.629 2.327 2.381-.624.231.14c1.393.844 3.003 1.29 4.536 1.29 4.56 0 8.271-3.71 8.271-8.271 0-2.21-.861-4.288-2.427-5.853-1.565-1.565-3.643-2.426-5.853-2.426" />
    </svg>
  );
}

export function YouTubeIcon({ className = "w-5 h-5", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg className={className} fill={color} viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

export function FacebookIcon({ className = "w-5 h-5", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg className={className} fill={color} viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

export function InstagramIcon({ className = "w-5 h-5", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg className={className} fill={color} viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

export function MailIcon({ className = "w-5 h-5", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg className={className} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

export interface SocialLinkItem {
  id: string;
  name: string;
  platform: string;
  handle: string;
  url: string;
  badge: string;
  description: string;
  bgColor: string;
  hoverColor: string;
  textColor: string;
  borderColor: string;
  iconColor: string;
  IconComponent: React.FC<{ className?: string; color?: string }>;
}

export const SOCIAL_MEDIA_LINKS: SocialLinkItem[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Channel',
    platform: 'WhatsApp',
    handle: 'Dreampath AI Updates',
    url: 'https://whatsapp.com/channel/0029VbCJ0xaDzgTJwRyUX90V',
    badge: 'Official Community',
    description: 'Instant admission alerts, merit lists, entry test guidelines & career tips directly on WhatsApp.',
    bgColor: 'bg-emerald-500/10',
    hoverColor: 'hover:bg-emerald-600 hover:text-white',
    textColor: 'text-emerald-600',
    borderColor: 'border-emerald-500/30',
    iconColor: '#25D366',
    IconComponent: WhatsAppIcon,
  },
  {
    id: 'youtube',
    name: 'YouTube Channel',
    platform: 'YouTube',
    handle: '@dreampathai.official',
    url: 'https://youtube.com/@dreampathai.official?si=TovylHEKqxnHWT2A',
    badge: 'Video Guides',
    description: 'Comprehensive degree roadmaps, university campus reviews & career strategy videos.',
    bgColor: 'bg-red-500/10',
    hoverColor: 'hover:bg-red-600 hover:text-white',
    textColor: 'text-red-600',
    borderColor: 'border-red-500/30',
    iconColor: '#FF0000',
    IconComponent: YouTubeIcon,
  },
  {
    id: 'facebook',
    name: 'Facebook Page',
    platform: 'Facebook',
    handle: 'Dreampath AI Official',
    url: 'https://www.facebook.com/share/1EWrtahKZP/',
    badge: 'Student Network',
    description: 'Join thousands of students for discussions, live Q&As & educational announcements.',
    bgColor: 'bg-blue-500/10',
    hoverColor: 'hover:bg-blue-600 hover:text-white',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-500/30',
    iconColor: '#1877F2',
    IconComponent: FacebookIcon,
  },
  {
    id: 'instagram',
    name: 'Instagram Page',
    platform: 'Instagram',
    handle: '@dreampathai.official',
    url: 'https://www.instagram.com/dreampathai.official/',
    badge: 'Daily Reels',
    description: 'Quick career reels, motivational stories, salary insights & university deadlines.',
    bgColor: 'bg-pink-500/10',
    hoverColor: 'hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white',
    textColor: 'text-pink-600',
    borderColor: 'border-pink-500/30',
    iconColor: '#E1306C',
    IconComponent: InstagramIcon,
  },
  {
    id: 'email',
    name: 'Email Support',
    platform: 'Email',
    handle: 'dreampathai.official@gmail.com',
    url: 'mailto:dreampathai.official@gmail.com',
    badge: 'Direct Contact',
    description: 'Official queries, counselor partnerships, feedback & personalized counseling help.',
    bgColor: 'bg-indigo-500/10',
    hoverColor: 'hover:bg-indigo-600 hover:text-white',
    textColor: 'text-indigo-600',
    borderColor: 'border-indigo-500/30',
    iconColor: '#6366F1',
    IconComponent: MailIcon,
  },
];

export function SocialIconsBar({ className = "flex items-center gap-2" }: { className?: string }) {
  return (
    <div className={className}>
      {SOCIAL_MEDIA_LINKS.map((item) => {
        const Icon = item.IconComponent;
        return (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`${item.name} (${item.handle})`}
            className={`p-2.5 rounded-xl border transition-all transform hover:scale-110 flex items-center justify-center bg-white shadow-xs ${item.borderColor} ${item.textColor} ${item.hoverColor}`}
          >
            <Icon className="w-5 h-5" color={item.iconColor} />
          </a>
        );
      })}
    </div>
  );
}

export function SocialConnectCard() {
  return (
    <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-2xl border border-slate-800">
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-500/20 via-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 font-extrabold text-xs uppercase tracking-wider">
          <span>Connect & Follow Dreampath AI</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-black font-display tracking-tight text-white">
          Join Our Growing Student Community Across Pakistan 🚀
        </h3>

        <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-medium">
          Get real-time university admission alerts, free entry test preparation guides, daily career reels, and direct counseling support on your favorite social channels!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-4">
          {SOCIAL_MEDIA_LINKS.map((link) => {
            const Icon = link.IconComponent;
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-3.5 bg-slate-800/80 hover:bg-slate-700/90 rounded-2xl border border-slate-700/80 transition-all hover:border-indigo-400/50 shadow-sm"
              >
                <div className={`p-2.5 rounded-xl ${link.bgColor} ${link.textColor} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" color={link.iconColor} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-xs text-white truncate group-hover:text-teal-300 transition-colors">
                      {link.name}
                    </span>
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-900/80 text-slate-300 border border-slate-700">
                      {link.platform}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">{link.handle}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function FloatingWhatsAppButton() {
  return (
    <motion.a
      href="https://whatsapp.com/channel/0029VbCJ0xaDzgTJwRyUX90V"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-2xl shadow-emerald-600/30 font-bold text-xs transition-all cursor-pointer border border-emerald-400/40"
      title="Join Dreampath AI Official WhatsApp Channel"
    >
      <WhatsAppIcon className="w-5 h-5 fill-white" color="#FFFFFF" />
      <span className="font-black text-xs uppercase tracking-wider hidden sm:inline">WhatsApp Group</span>
      <span className="flex h-2 w-2 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
      </span>
    </motion.a>
  );
}
