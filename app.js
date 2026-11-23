(function(){
var d=document,top=d.getElementById('top'),b=top.querySelector('.burger');
b.addEventListener('click',function(){var o=top.classList.toggle('open');b.setAttribute('aria-expanded',o)});
d.addEventListener('keydown',function(e){if(e.key==='Escape'){top.classList.remove('open');b.setAttribute('aria-expanded',false);zamknij()}});
var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// prompter w pierwszym ekranie
var pr=d.querySelector('.prompter');
if(pr&&!rm){var s=pr.querySelectorAll('span'),i=0;setInterval(function(){var a=s[i];a.classList.remove('on');a.classList.add('out');i=(i+1)%s.length;var n=s[i];n.classList.remove('out');void n.offsetWidth;n.classList.add('on');setTimeout(function(){a.classList.remove('out')},700)},2600)}
// pojawianie przy przewijaniu
var w=d.querySelectorAll('.wej, .wym-grid, .linie li');
if('IntersectionObserver' in window){
 var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('widac');io.unobserve(e.target)}})},{rootMargin:'0px 0px -12% 0px'});
 w.forEach(function(x){if(!x.closest('.linie'))io.observe(x)});
 var li=d.querySelectorAll('.linie li');
 if(li.length){var io2=new IntersectionObserver(function(en){en.forEach(function(e){e.target.classList.toggle('on',e.isIntersecting)})},{rootMargin:'-38% 0px -38% 0px'});li.forEach(function(x){io2.observe(x)})}
}else{w.forEach(function(x){x.classList.add('widac','on')})}
// karteczki
var ok=d.getElementById('okno'),oc=d.getElementById('okno-c'),dane=d.getElementById('kartki-dane'),ost=null;
function zamknij(){if(!ok||!ok.classList.contains('on'))return;ok.classList.remove('on');ok.setAttribute('aria-hidden','true');if(ost)ost.focus()}
if(dane){var K=JSON.parse(dane.textContent);
 d.querySelectorAll('.kartka').forEach(function(k){k.addEventListener('click',function(){var x=K[+k.dataset.k];ost=k;
  var h='<span class="nr">'+x.nr+'</span><h3 id="okno-h">'+x.t+'</h3><p style="margin-top:10px;opacity:.85">'+x.p+'</p><ul>'+x.l.map(function(t){return '<li>'+t+'</li>'}).join('')+'</ul><a class="btn" href="'+x.u+'">Więcej o obszarze</a>';
  oc.innerHTML=h;ok.querySelector('.in').className='in c'+(+k.dataset.k+1);ok.classList.add('on');ok.setAttribute('aria-hidden','false');ok.querySelector('.zamknij').focus()})});
 ok.addEventListener('click',function(e){if(e.target===ok||e.target.closest('.zamknij'))zamknij()});
}
// formularz (wersja robocza)
var f=d.getElementById('form');if(f)f.addEventListener('submit',function(e){e.preventDefault();d.getElementById('ok').hidden=false});
// cookies
var c=d.getElementById('cookies');
function zapisz(v){try{localStorage.setItem('ck',JSON.stringify({v:v,t:Date.now()}))}catch(e){}c.hidden=true}
c.addEventListener('click',function(e){var t=e.target.closest('button');if(!t)return;var a=t.dataset.c;
 if(a==='all')zapisz('all');else if(a==='min')zapisz('min');else if(a==='ust'){var u=d.getElementById('ck-ust');if(u.hidden){u.hidden=false;t.textContent='Zapisz wybór'}else zapisz(d.getElementById('ck-stat').checked?'all':'min')}});
var co=d.getElementById('ck-open');if(co)co.addEventListener('click',function(){c.hidden=false});
d.getElementById('rok').textContent=new Date().getFullYear();
})();
