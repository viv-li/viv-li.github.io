!function(){var a=document.getElementById("water-canvas"),t=a.getContext("2d"),p=960,D=400,S=p>>1,w=D>>1,e=p*(D+2)*2,r=30,X=p,Y=p*(D+3),o=9,x=[],A=[],B,E;a.width=p,a.height=D;var n=t.createLinearGradient(0,0,0,D);n.addColorStop(0,"#1A719C"),n.addColorStop(1,"#124C68"),t.fillStyle=n,t.fillRect(0,0,p,D),E=t.getImageData(0,0,p,D),B=t.getImageData(0,0,p,D);for(var f=0;f<e;f++)A[f]=x[f]=0;function v(){i(),t.putImageData(B,0,0)}function d(a,t){a<<=0;for(var e=(t<<=0)-9;e<t+9;e++)for(var r=a-9;r<a+9;r++)x[X+e*p+r]+=256}function i(){var a,t,e,r,o,n,f=X;X=Y,Y=f;for(var v=0,d=p,i=D,l=x,c=A,u=B.data,g=E.data,m=S,s=w,I=0;I<i;I++)for(var C=0;C<d;C++){var h=Y+v,y=X+v;e=l[y-d]+l[y+d]+l[y-1]+l[y+1]>>1,e-=l[h],e-=e>>5,e=1024-(l[h]=e),(n=c[v])!=(c[v]=e)&&(d<=(a=((C-m)*e/1024<<0)+m)&&(a=d-1),a<0&&(a=0),i<=(t=((I-s)*e/1024<<0)+s)&&(t=i-1),t<0&&(t=0),o=4*(a+t*d),u[r=4*v]=g[o],u[r+1]=g[o+1],u[r+2]=g[o+2]),++v}}a.onmousemove=function(a){d(a.offsetX||a.layerX,a.offsetY||a.layerY)},setInterval(v,r);var l=Math.random;setInterval(function(){d(l()*p,l()*D)},400)}();