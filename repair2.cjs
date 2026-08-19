const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

// The issue is around line 3280, there's `];` which shouldn't be there because it closes the array early.
// Let's find it. It's `];\n,\n\n  {`

content = content.replace(/\];\n,\n\n  \{/g, ',\n\n  {');

fs.writeFileSync('src/data.ts', content, 'utf8');
