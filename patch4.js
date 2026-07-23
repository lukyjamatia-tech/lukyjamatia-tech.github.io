const fs=require('fs');
let s=fs.readFileSync('index.html','utf8');
const re=/window\.deletePost=async function\(id\)\{[\s\S]*?\n\};\n(?=window\.submitEdit)/;
const nf=`window.deletePost=async function(id){
 var adminMode=(sessionStorage.getItem('adminLoggedIn')==='true')||(window._ngoUser&&window._ngoUser.type==='admin');
 function say(m,ok){var d=document.createElement('div');d.textContent=m;d.style.cssText='position:fixed;top:70px;left:50%;transform:translateX(-50%);z-index:2147483647;background:'+(ok?'#059669':'#DC2626')+';color:white;padding:14px 18px;border-radius:12px;font-size:14px;font-weight:700;box-shadow:0 8px 24px rgba(0,0,0,.4);max-width:90vw;';document.body.appendChild(d);setTimeout(function(){d.remove();},8000);}
 if(!adminMode){if(!confirm((window.APP_LANG==='hi')?'यह पोस्ट डिलीट करना चाहते हो?':'Delete this post?'))return;}
 var post=(window._allPosts||[]).find(function(p){return p.id===id;});
 if(!post){say('Post not found',false);return;}
 if(!adminMode&&(!window._currentUser||window._currentUser.uid!==post.uid)){say('Sirf post owner hi delete kar sakta hai',false);return;}
 say('Deleting...',true);
 try{await deleteDoc(doc(db,"posts",id));say('DELETED: '+(post.item||''),true);}
 catch(e){var fu=(window._auth&&window._auth.currentUser)||null;say('FAILED: '+((e&&e.code)||e)+(fu?(' | login: '+(fu.email||fu.uid)):' | login: NONE'),false);}
};
`;
if(re.test(s)){s=s.replace(re,nf);console.log('DELETEPOST REWRITE: OK');}
else{console.log('DELETEPOST REWRITE: NOT FOUND');}
fs.writeFileSync('index.html',s);
