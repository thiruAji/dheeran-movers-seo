import { build } from 'vite';
import React from 'react';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { renderToString } from 'react-dom/server';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { pages } from '../src/pages.js';
import { articles, blogIndex } from '../src/blog.js';

const root=process.cwd();
const ssrOut=resolve(root,'.ssr');
await build({plugins:[react(),tailwindcss()],build:{ssr:'src/main.jsx',outDir:ssrOut,emptyOutDir:true,rollupOptions:{output:{entryFileNames:'entry.js'}}}});
const {App}=await import(`${pathToFileURL(resolve(ssrOut,'entry.js')).href}?v=${Date.now()}`);
const template=await readFile(resolve(root,'dist/index.html'),'utf8');
const base=(process.env.VITE_SITE_URL||'https://www.your-domain.sg').replace(/\/$/,'');
const phone=process.env.VITE_PHONE_NUMBER||undefined;
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
function head(title,description,url,page){
  const crumbs=page?.slug?.startsWith('blog/')?[{"@type":"ListItem",position:1,name:'Home',item:`${base}/`},{"@type":"ListItem",position:2,name:'Moving guides',item:`${base}/blog`},{"@type":"ListItem",position:3,name:page.h1,item:`${base}/${page.slug}`}]:page?[{"@type":"ListItem",position:1,name:'Home',item:`${base}/`},{"@type":"ListItem",position:2,name:page.h1,item:`${base}/${page.slug}`}]:[];
  const schemas=[{"@context":"https://schema.org","@type":"MovingCompany",name:'Dheeran Movers',url:base,description:'Moving services in Singapore. Contact the company to confirm current service areas and availability.',areaServed:{"@type":"Country",name:'Singapore'},...(phone?{telephone:phone}:{})}];
  if(page?.type==='Article') schemas.push({"@context":"https://schema.org","@type":"Article",headline:page.h1,description:page.description,mainEntityOfPage:url,author:{"@type":"Organization",name:'Dheeran Movers'},publisher:{"@type":"Organization",name:'Dheeran Movers'}});
  else if(page && page!==blogIndex) schemas.push({"@context":"https://schema.org","@type":"Service",name:page.h1,description:page.description,provider:{"@type":"MovingCompany",name:'Dheeran Movers',url:base},areaServed:{"@type":"Country",name:'Singapore'}});
  if(page) schemas.push({"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:crumbs});
  const meta=`<title>${esc(title)}</title><meta name="description" content="${esc(description)}"/><link rel="canonical" href="${esc(url)}"/><meta property="og:title" content="${esc(title)}"/><meta property="og:description" content="${esc(description)}"/><meta property="og:type" content="website"/><meta property="og:url" content="${esc(url)}"/><script type="application/ld+json">${JSON.stringify(schemas).replace(/</g,'\\u003c')}</script>`;
  return template.replace(/<title>[\s\S]*?<\/title>/,meta);
}
async function emit(path,page){
  const pathname=path==='/'?'/':`/${path}`;
  const title=page?.title||'Dheeran Movers | Moving Services in Singapore';
  const description=page?.description||'Explore Singapore moving services with Dheeran Movers. Plan your move and request a tailored quotation.';
  const markup=renderToString(React.createElement(App,{pathname}));
  const html=head(title,description,base+(page?`/${page.slug}`:'/'),page).replace('<div id="root"></div>',`<div id="root">${markup}</div>`);
  const out=resolve(root,'dist',...(path?path.split('/'):[]),'index.html');
  await mkdir(dirname(out),{recursive:true});await writeFile(out,html,'utf8');
}
for(const page of pages) await emit(page.slug,page);
await emit(blogIndex.slug,blogIndex);
for(const article of articles) await emit(article.slug,{...article,type:'Article'});
await emit('/',undefined);
await rm(ssrOut,{recursive:true,force:true});
console.log(`Pre-rendered ${pages.length+articles.length+2} HTML documents with route-specific metadata and visible page content.`);
