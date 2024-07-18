import{a as P,S,i as c}from"./assets/vendor-58a9f1d3.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const v="44822255-685480c2b82623113acf30a35";function u({q:r="",page:i=1,per_page:s=1}={}){return P.get("https://pixabay.com/api/",{params:{key:v,q:r,page:i,per_page:s,imageType:"photo",orientation:"horizontal",safeSearch:!0}}).then(({data:o})=>o)}const p=document.querySelector(".js-gallery");function d(r){const i=r.map(({largeImageURL:s,webformatURL:o,tags:e,likes:t,views:l,comments:L,downloads:q})=>`
    <li class="gallery-item">
    <a href="${s}">
    <img src="${o}" alt="${e}" class="card-img"/>
    </a>
    <ul class="galery-item-description">
    <li>
    <p class="count-text">Likes</p>
    <p class="count">${t}</p>
    </li>
    <li>
    <p class="count-text">Views</p>
    <p class="count">${l}</p>
    </li>
    <li>
    <p class="count-text">Comments</p>
    <p class="count">${L}</p>
    </li>
    <li>
    <p class="count-text">Downloads</p>
    <p class="count">${q}</p>
    </li>
    </ul>
    </li>
    `).join("");p.insertAdjacentHTML("beforeend",i),new S(".gallery a",{captions:!0,captionsData:"alt",captionPosition:"bottom",captionDelay:250,overlayOpacity:.8})}function w(){p.innerHTML=""}const m=document.querySelector(".js-search"),f=document.querySelector(".loader"),n=document.querySelector(".load-more"),g=document.querySelector(".js-gallery"),a={q:"",page:1,per_page:15,maxPage:0};m.addEventListener("submit",x);async function x(r){r.preventDefault(),a.page=1,w();const i=r.currentTarget;if(a.q=i.elements.search.value.trim().toLowerCase(),!a.q){c.info({title:"Info",message:"Please enter a search query.",position:"topRight",timeout:2e3});return}h(),n.style.display="block";try{const{total:s,hits:o}=await u(a);if(a.maxPage=Math.ceil(s/a.per_page),o.length===0){c.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:2e3}),n.style.display="none";return}d(o),g.scrollIntoView({behavior:"smooth",block:"start"}),o.length>0&&o.length!=s?(n.disabled=!1,n.addEventListener("click",y)):o.length<=15&&(n.style.display="none",c.info({title:"Info",message:"You have reached the maximum number of images for your request",position:"topRight",timeout:2e3}))}catch(s){c.error({title:"Error",message:`Error: ${s}`,position:"topRight",timeout:2e3})}finally{b(),m.reset}}async function y(){a.page+=1,n.disabled=!0,h();try{const{hits:r}=await u(a);d(r);const{height:i}=g.firstElementChild.getBoundingClientRect();window.scrollBy({top:i*2,behavior:"smooth"})}catch(r){c.error({title:"Error",message:`Error: ${r}`,position:"topRight",timeout:2e3})}finally{b(),n.disabled=!1,a.page===a.maxPage&&(n.style.display="none",n.removeEventListener("click",y))}}function h(){f.style.display="block"}function b(){f.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
