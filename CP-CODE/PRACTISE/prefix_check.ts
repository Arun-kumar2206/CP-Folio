// Placeholder TypeScript solution for practice
import * as fs from 'fs';
const data = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
const s = data[0] || '';
console.log(s.startsWith('pre') ? 'yes' : 'no');
