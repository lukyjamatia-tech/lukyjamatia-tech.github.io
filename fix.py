c=open('index.html').read()
c=c.replace('signInWithPopup','signInWithRedirect')
open('index.html','w').write(c)
