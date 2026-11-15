import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pages } from '../src/pages.js';
const root=process.cwd(), dist=resolve(root,'dist');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;');
if(pages.length!==30)throw new Error(`Expected 30 pages, found ${pages.length}`);
const slugs=new Set(),titles=new Set(),descriptions=new Set();
for(const p of pages){
  if(slugs.has(p.slug))throw new Error(`Duplicate slug: ${p.slug}`);slugs.add(p.slug);
  if(titles.has(p.title))throw new Error(`Duplicate title: ${p.title}`);titles.add(p.title);
  if(descriptions.has(p.description))throw new Error(`Duplicate description: ${p.description}`);descriptions.add(p.description);
  const file=resolve(dist,p.slug,'index.html');await access(file);const html=await readFile(file,'utf8');
  for(const [label,ok] of [['unique title',html.includes(`<title>${esc(p.title)}</title>`)],['description',html.includes(`content="${esc(p.description)}"`)],['canonical',html.includes(`href="https://www.your-domain.sg/${p.slug}"`)],['visible H1',html.includes(`<h1>${esc(p.h1)}</h1>` )],['quote form',html.includes('Request My Quote')],['FAQ content',html.includes('Questions about')],['service schema',html.includes('"@type":"Service"')]])if(!ok)throw new Error(`${p.slug} is missing ${label}`);
  if(!html.includes('og:title')||!html.includes('BreadcrumbList'))throw new Error(`${p.slug} is missing social metadata or breadcrumb schema`);
}
const sitemap=await readFile(resolve(root,'public/sitemap.xml'),'utf8');
for(const slug of slugs)if(!sitemap.includes(`https://www.your-domain.sg/${slug}`))throw new Error(`Sitemap is missing ${slug}`);
const home=await readFile(resolve(dist,'index.html'),'utf8');
if(!home.includes('<h1>')||!home.includes('Get a moving quote'))throw new Error('Home page content was not pre-rendered');
console.log(`Verified ${pages.length} pre-rendered routes, unique titles/descriptions, canonical URLs, visible content, quote forms, service/breadcrumb schema, and sitemap entries.`);
