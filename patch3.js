const fs=require('fs');
let s=fs.readFileSync('index.html','utf8');
let b=s;
s=s.replace("delBtn.onclick=(function(pid,r){return function(){if(confirm('Delete?')){window.deletePost(pid);r.remove();}};})(p.id,row);","delBtn.onclick=(function(pid){return function(){window.deletePost(pid);};})(p.id);");
console.log('C1:',s!==b?'OK':'ALREADY/NOT FOUND');b=s;
s=s.replace(/window\.adminDelPost=function\(id,btn\)\{\s*if\(!confirm\('Delete this post\?'\)\)return;/,"window.adminDelPost=function(id,btn){");
console.log('C2:',s!==b?'OK':'ALREADY/NOT FOUND');
fs.writeFileSync('index.html',s);
console.log('Done');
