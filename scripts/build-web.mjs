// Builds www/index.html (standalone web/app version) from the single-file game source.
import {readFileSync,writeFileSync} from 'node:fs';
const src=readFileSync(new URL('../src/index.html',import.meta.url),'utf8');
const pkg=JSON.parse(readFileSync(new URL('../package.json',import.meta.url),'utf8'));
const WEB='https://mitsuru-alt.github.io/dotabata-futsal/';
const head=`<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<meta name="theme-color" content="#1E1A24">
<meta name="dotabata-web" content="${WEB}">
<meta name="dotabata-version" content="${pkg.version}">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="ドタバタ">
<meta name="format-detection" content="telephone=no">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icons/icon-192.png">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
`;
const tail=`
<script>
/* app shell: offline cache on the web, full-screen landscape inside the native app */
(function(){
  var C=window.Capacitor, native=!!(C&&C.isNativePlatform&&C.isNativePlatform());
  if(native){
    var P=C.Plugins||{};
    try{ P.StatusBar&&P.StatusBar.hide().catch(function(){}); }catch(e){}
    try{ P.ScreenOrientation&&P.ScreenOrientation.lock({orientation:'landscape'}).catch(function(){}); }catch(e){}
    document.documentElement.classList.add('native');
  } else if('serviceWorker' in navigator && location.protocol==='https:'){
    addEventListener('load',function(){ navigator.serviceWorker.register('sw.js').catch(function(){}); });
  }
})();
</script>
</body>
</html>
`;
let body=src;
// the source starts with <title> etc. (artifact format); wrap it into a full document
const i=body.indexOf('<style');
const headPart=body.slice(0,i), rest=body.slice(i);
const j=rest.indexOf('</style>')+8;
const out=head+headPart+rest.slice(0,j)+'\n</head>\n<body>\n'+rest.slice(j)+tail;
writeFileSync(new URL('../www/index.html',import.meta.url),out);
writeFileSync(new URL('../www/version.json',import.meta.url),JSON.stringify({version:pkg.version,built:new Date().toISOString()})+'\n');
console.log('www/index.html',out.length,'bytes, v'+pkg.version);
