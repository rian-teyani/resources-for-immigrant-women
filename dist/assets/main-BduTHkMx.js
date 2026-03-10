(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const c=`<div class="nav-container">
  <a href="/index.html" class="nav-logo">Health Empower</a>
  <div class="nav-links">
    <a href="/educational_modules/index.html">Modules</a>
    <a href="/index.html#resources">Resources</a>
    <a href="/index.html#about">About Us</a>
  </div>
</div>
`;document.addEventListener("DOMContentLoaded",()=>{const r=document.querySelector("#navbar");r&&(r.innerHTML=c)});
