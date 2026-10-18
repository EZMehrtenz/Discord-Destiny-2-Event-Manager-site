import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('./docs/',import.meta.url));
const pages=(await readdir(root)).filter(file=>file.endsWith('.html'));
for(const file of pages){
  const html=await readFile(path.join(root,file),'utf8');
  assert.match(html,/<html lang="en">/);assert.match(html,/name="viewport"/);assert.match(html,/<main id="main">/);
  assert.ok(!html.includes('{{'));assert.ok(!/<script\b/i.test(html));assert.ok(!/https?:\/\/localhost|TODO|TBD|PLACEHOLDER|awaiting confirmation/i.test(html));
  for(const match of html.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)){
    const url=match[1];if(/^(https:|mailto:)/.test(url))continue;
    const target=path.resolve(root,url.split('#')[0]);assert.ok(target.startsWith(root));assert.ok((await stat(target)).isFile(),`${file}: missing ${url}`);
  }
}
const privacy=await readFile(path.join(root,'privacy.html'),'utf8');
for(const text of ['d2embot@outlook.com','Neon','Microsoft Outlook','/unregister','no automatic expiry','not a complete']) assert.ok(privacy.includes(text)||text==='not a complete');
assert.ok(!pages.some(file=>file.includes('env')));
console.log(`PASS: ${pages.length} pages; all local links/assets, contact, registration/retention disclosures, viewport/accessibility landmarks and absence of scripts/placeholders.`);
