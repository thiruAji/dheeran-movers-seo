import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pages } from '../src/pages.js';
import { articles, blogIndex } from '../src/blog.js';
import { pricePage } from '../src/price-page.js';
const root=process.cwd(), dist=resolve(root,'dist');
const base=(process.env.VITE_SITE_URL||'https://www.your-domain.sg').replace(/\/$/,'');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;');
if(pages.length!==31)throw new Error(`Expected 31 pages, found ${pages.length}`);
const slugs=new Set(),titles=new Set(),descriptions=new Set();
for(const p of pages){
  if(slugs.has(p.slug))throw new Error(`Duplicate slug: ${p.slug}`);slugs.add(p.slug);
  if(titles.has(p.title))throw new Error(`Duplicate title: ${p.title}`);titles.add(p.title);
  if(descriptions.has(p.description))throw new Error(`Duplicate description: ${p.description}`);descriptions.add(p.description);
  const file=resolve(dist,p.slug,'index.html');await access(file);const html=await readFile(file,'utf8');
  for(const [label,ok] of [['unique title',html.includes(`<title>${esc(p.title)}</title>`)],['description',html.includes(`content="${esc(p.description)}"`)],['canonical',html.includes(`href="${base}/${p.slug}"`)],['visible H1',html.includes(`<h1>${esc(p.h1)}</h1>` )],['quote form',html.includes('Request My Quote')],['FAQ content',html.includes('Questions about')],['service schema',html.includes('"@type":"Service"')]])if(!ok)throw new Error(`${p.slug} is missing ${label}`);
  if(!html.includes('og:title')||!html.includes('BreadcrumbList'))throw new Error(`${p.slug} is missing social metadata or breadcrumb schema`);
}
const blogIndexHtml=await readFile(resolve(dist,blogIndex.slug,'index.html'),'utf8');
if(!blogIndexHtml.includes(`<title>${esc(blogIndex.title)}</title>`)||!blogIndexHtml.includes(`<h1>${esc(blogIndex.h1)}</h1>`))throw new Error('Blog index is missing its title or visible heading');
const pricesHtml=await readFile(resolve(dist,pricePage.slug,'index.html'),'utf8');
for(const [label,ok] of [['title',pricesHtml.includes(`<title>${esc(pricePage.title)}</title>`)],['description',pricesHtml.includes(`content="${esc(pricePage.description)}"`)],['canonical',pricesHtml.includes(`href="${base}/${pricePage.slug}"`)],['visible H1',pricesHtml.includes(`<h1>${esc(pricePage.h1)}</h1>`)],['price accordions',pricesHtml.includes('id="price-hdb"')&&pricesHtml.includes('id="price-trolley"')&&pricesHtml.includes('id="price-packing"')],['breadcrumb schema',pricesHtml.includes('"@type":"BreadcrumbList"')]])if(!ok)throw new Error(`Prices page is missing ${label}`);
for(const article of articles){
  const file=resolve(dist,...article.slug.split('/'),'index.html');await access(file);const html=await readFile(file,'utf8');
  for(const [label,ok] of [['title',html.includes(`<title>${esc(article.title)}</title>` )],['description',html.includes(`content="${esc(article.description)}"`)],['canonical',html.includes(`href="${base}/${article.slug}"`)],['visible H1',html.includes(`<h1>${esc(article.h1)}</h1>` )],['article schema',html.includes('"@type":"Article"')],['breadcrumb schema',html.includes('"@type":"BreadcrumbList"')]])if(!ok)throw new Error(`${article.slug} is missing ${label}`);
}
const sitemap=await readFile(resolve(root,'public/sitemap.xml'),'utf8');
for(const slug of slugs)if(!sitemap.includes(`${base}/${slug}`))throw new Error(`Sitemap is missing ${slug}`);
for(const route of [pricePage.slug,blogIndex.slug,...articles.map(article=>article.slug)])if(!sitemap.includes(`${base}/${route}`))throw new Error(`Sitemap is missing ${route}`);
const home=await readFile(resolve(dist,'index.html'),'utf8');
if(!home.includes('<h1>')||!home.includes('Get a moving quote'))throw new Error('Home page content was not pre-rendered');
if(home.includes('HDB whole-flat moving prices')||home.includes('Choose a price group to view'))throw new Error('Prices section should be on its own page, not the homepage');
console.log(`Verified ${pages.length} service routes, the prices page, and ${articles.length+1} blog routes, unique metadata, canonicals, visible content, schemas, and sitemap entries.`);
