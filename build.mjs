import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
const config = JSON.parse(await readFile(new URL('./site.json', import.meta.url), 'utf8'));
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email)) throw new Error('A valid support contact is required.');
const esc = text => String(text).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const email = esc(config.email);
const links = [['index.html','Home'],['terms.html','Terms'],['privacy.html','Privacy'],['support.html','Support']];
function shell(file, title, description, main) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${esc(description)}"><meta name="theme-color" content="#0b1117"><title>${esc(title)} | ${esc(config.name)}</title><link rel="icon" href="./assets/logo.svg" type="image/svg+xml"><link rel="stylesheet" href="./assets/style.css"></head>
<body><a class="skip" href="#main">Skip to content</a><div class="wrap"><header class="topbar"><a class="brand" href="./index.html"><img src="./assets/logo.svg" width="48" height="48" alt=""><span>Destiny 2 Event Manager<small>Community coordination</small></span></a><nav aria-label="Main navigation">${links.map(([href,label])=>`<a href="./${href}"${file===href?' aria-current="page"':''}>${label}</a>`).join('')}</nav></header>
<main id="main">${main}</main><footer class="site-footer"><p>Independent community project. Not affiliated with or endorsed by Bungie or Discord.<br>Destiny and related marks belong to their respective owners.</p><p class="credit">Developed by: ${esc(config.operator)}</p></footer></div></body></html>\n`;
}
await mkdir(new URL('./docs/assets/',import.meta.url),{recursive:true});
for (const file of ['logo.svg','style.css']) await copyFile(new URL('./assets/'+file,import.meta.url),new URL('./docs/assets/'+file,import.meta.url));
await writeFile(new URL('./docs/.nojekyll',import.meta.url),'');
for (const name of ['terms','privacy','support']) {
  const data=JSON.parse(await readFile(new URL('./content/'+name+'.json',import.meta.url),'utf8'));
  const heading=`<header class="page-heading"><p class="eyebrow">Community information</p><h1>${esc(data.title)}</h1><p class="intro">${esc(data.intro)}</p><p class="date">Last updated: <time datetime="2026-10-18">${esc(config.updated)}</time></p></header>`;
  const toc=`<aside class="toc" aria-label="On this page"><strong>On this page</strong>${data.sections.map(s=>`<a href="#${s.id}">${esc(s.title)}</a>`).join('')}</aside>`;
  const sections=data.sections.map(s=>`<section id="${s.id}"><h2>${esc(s.title)}</h2>${s.html.replaceAll('{{EMAIL}}',email)}</section>`).join('\n');
  await writeFile(new URL('./docs/'+name+'.html',import.meta.url),shell(name+'.html',data.title,data.intro,heading+`<div class="document">${toc}<article>${sections}</article></div>`));
}
const home=`<section class="hero"><div><p class="eyebrow">Destiny 2 · Community tools</p><h1>Your fireteam.<br><span>Your next run.</span></h1><p class="lede">Sherpa requests, activity coordination and a clearer path from “who’s in?” to a scheduled fireteam.</p><div class="actions"><a class="button primary" href="./support.html">Get support</a><a class="button" href="./privacy.html">How your data is used</a></div></div><img class="hero-art" src="./assets/logo.svg" width="260" height="260" alt="Destiny 2 Event Manager emblem"></section>
<div class="notice"><strong>In active development.</strong> This is the project’s information and support website. Bot features are being built and tested step by step; preview screens do not create live events.</div>
<section class="section"><p class="eyebrow">Built for the community</p><h2>One place to coordinate the next activity.</h2><div class="columns"><div><span class="number">01 / GUIDED RUNS</span><h3>Request a Sherpa</h3><p>Submit a request, coordinate with a Sherpa and settle the details before creating the linked event.</p></div><div><span class="number">02 / YOUR IDENTITY</span><h3>Recognise your fireteam</h3><p>Use full Bungie names, optional D2 game roles and server-defined access for Members, Sherpas and Bot Admins.</p></div><div><span class="number">03 / WHAT’S NEXT</span><h3>Independent LFG</h3><span class="pill">In development</span><p>The broader Fireteam Finder journey is being developed alongside the working Sherpa request and event tools.</p></div></div></section>
<section class="section"><p class="eyebrow">Clear before you join</p><h2>Your information. Clear expectations.</h2><p>Read what the bot stores, understand what unregistration removes, or contact the project directly. No account or sign-in is needed to read these pages.</p><div class="link-grid"><a href="./terms.html">Terms of Service ↗<small>How the service works and the ground rules.</small></a><a href="./privacy.html">Privacy Policy ↗<small>Data, visibility, retention and your choices.</small></a><a href="./support.html">Support & data requests ↗<small>Help, corrections and deletion requests.</small></a></div></section>`;
await writeFile(new URL('./docs/index.html',import.meta.url),shell('index.html','Home','Community tools for Destiny 2 Sherpa requests, fireteams and events. Read the Terms, Privacy Policy and support information.',home));
await writeFile(new URL('./docs/404.html',import.meta.url),shell('404.html','Page not found','This page could not be found.',`<header class="page-heading"><p class="eyebrow">404</p><h1>That page isn’t here.</h1><p>Use the navigation above to find the Terms, Privacy Policy or Support page.</p></header>`));
console.log('Built five static pages in docs/. No dependencies or external scripts.');
