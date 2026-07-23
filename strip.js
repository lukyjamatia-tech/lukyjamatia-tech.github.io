const fs = require('fs');
let s = fs.readFileSync('index.html', 'utf8');
s = s.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu, '');
fs.writeFileSync('index.html', s);
console.log('done');
