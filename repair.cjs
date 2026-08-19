const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

// The issue is:
// export const DEGREES: Degree[] = [
//     {
//     // MEDICAL AND HEALTH SCIENCES,
//     {
//     id: 'mlt-cert',

// Or something like that.

// Also, the domain might be corrupted because of DomainType.TECHNOLOGY being generated without the DomainType prefix, wait, I put `DomainType.TECHNOLOGY`.
content = content.replace(/export const DEGREES: Degree\[\] = \[\s*\{\s*\/\/\s*MEDICAL AND HEALTH SCIENCES,?\s*\{/g, 'export const DEGREES: Degree[] = [\n  {\n    // MEDICAL AND HEALTH SCIENCES');

content = content.replace(/\{\s*\/\/\s*MEDICAL AND HEALTH SCIENCES,?\s*\{/g, '{\n    // MEDICAL AND HEALTH SCIENCES');

fs.writeFileSync('src/data.ts', content, 'utf8');
