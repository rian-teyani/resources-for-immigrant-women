(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(e){if(e.ep)return;e.ep=!0;const n=a(e);fetch(e.href,n)}})();const l=`<div class="nav-container">
  <a href="/resources-for-immigrant-women/index.html" class="nav-logo">Health Empower</a>
  <div class="nav-links">
    <a href="/resources-for-immigrant-women/educational_modules/index.html">Modules</a>
    <a href="/resources-for-immigrant-women/index.html#resources">Resources</a>
    <a href="/resources-for-immigrant-women/index.html#about">About Us</a>
  </div>
</div>
`;document.addEventListener("DOMContentLoaded",()=>{const r=document.querySelector("#navbar");r&&(r.innerHTML=l);const t=document.getElementById("findClinics"),a=document.getElementById("zipCode");t&&a&&(t.addEventListener("click",async()=>{const i=a.value.trim();if(!i||i.length!==5||!/^\d+$/.test(i)){o("Please enter a valid 5-digit zip code.");return}t.disabled=!0,t.textContent="Searching...";try{await c(i)}catch{o("Unable to find clinics. Please try again or visit hrsa.gov directly.")}finally{t.disabled=!1,t.textContent="Find Clinics"}}),a.addEventListener("keypress",i=>{i.key==="Enter"&&t.click()}))});async function c(r){d(r)}function d(r){const t=document.getElementById("clinicResults");t.innerHTML=`
    <div class="clinic-result">
      <h4>Clinic Search</h4>
      <p>We couldn't load clinic data automatically. Here are reliable ways to find clinics near ${r}:</p>
      <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;">
        <a href="https://www.hrsa.gov/find-a-health-center" target="_blank" class="btn primary-btn btn-small">HRSA Health Centers</a>
        <a href="https://www.healthcare.gov/where-can-i-get-covered/" target="_blank" class="btn primary-btn btn-small">Healthcare.gov</a>
        <a href="https://www.plannedparenthood.org/health-center" target="_blank" class="btn primary-btn btn-small">Planned Parenthood</a>
      </div>
    </div>
  `}function o(r){const t=document.getElementById("clinicResults");t.innerHTML=`
    <div class="clinic-result" style="border-left-color: #ff6b6b;">
      <h4>Error</h4>
      <p>${r}</p>
    </div>
  `}
