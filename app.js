(function(){
var top=document.getElementById('top'),b=top.querySelector('.burger');
b.addEventListener('click',function(){var o=top.classList.toggle('open');b.setAttribute('aria-expanded',o)});
top.querySelectorAll('.nav a').forEach(function(a){a.addEventListener('click',function(){top.classList.remove('open');b.setAttribute('aria-expanded',false)})});
var sc=function(){top.classList.toggle('sc',window.scrollY>10)};window.addEventListener('scroll',sc,{passive:true});requestAnimationFrame(sc);
var k=document.getElementById('karty');
document.querySelectorAll('.str button').forEach(function(x){x.addEventListener('click',function(){var c=k.querySelector('.karta');k.scrollBy({left:(c.offsetWidth+20)*+x.dataset.d,behavior:'smooth'})})});
var down=false,sx=0,sl=0,moved=false;
k.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=k.scrollLeft});
window.addEventListener('pointermove',function(e){if(!down)return;var d=e.clientX-sx;if(Math.abs(d)>4){moved=true;k.classList.add('drag')}k.scrollLeft=sl-d});
window.addEventListener('pointerup',function(){if(!down)return;down=false;if(moved){var c=k.querySelector('.karta'),w=c.offsetWidth+20;var t=Math.round(k.scrollLeft/w)*w;k.classList.remove('drag');k.scrollTo({left:t,behavior:'smooth'})}});
var m=document.getElementById('mapa');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(en){if(en[0].isIntersecting){var f=document.createElement('iframe');f.src=m.dataset.src;f.title='Mapa: Smugowa 24A, Katowice';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';m.appendChild(f);io.disconnect()}},{rootMargin:'300px'});io.observe(m)}
var f=document.getElementById('form');f.addEventListener('submit',function(e){e.preventDefault();document.getElementById('ok').hidden=false});
document.getElementById('rok').textContent=new Date().getFullYear();
})();
