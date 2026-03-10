(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();const l=`<div class="nav-container">
  <a href="/resources-for-immigrant-women/index.html" class="nav-logo">Health Empower</a>
  <div class="nav-links">
    <a href="/resources-for-immigrant-women/educational_modules/index.html">Modules</a>
    <a href="/resources-for-immigrant-women/index.html#resources">Resources</a>
    <a href="/resources-for-immigrant-women/index.html#about">About Us</a>
  </div>
</div>
`;document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector("#navbar");n&&(n.innerHTML=l);const t=document.getElementById("findClinics"),i=document.getElementById("zipCode");t&&i&&(t.addEventListener("click",async()=>{const r=i.value.trim();if(!r||r.length!==5||!/^\d+$/.test(r)){o("Please enter a valid 5-digit zip code.");return}t.disabled=!0,t.textContent="Searching...";try{await c(r)}catch{o("Unable to find clinics. Please try again or visit hrsa.gov directly.")}finally{t.disabled=!1,t.textContent="Find Clinics"}}),i.addEventListener("keypress",r=>{r.key==="Enter"&&t.click()}))});async function c(n){try{const t=await fetch("https://findahealthcenter.hrsa.gov/widgets-data/widgets-data-v1.json");if(!t.ok)throw new Error("API request failed");const r=(await t.json()).filter(e=>e.zip_code?.toString().startsWith(n.substring(0,3))||e.zip_code?.toString()===n).slice(0,5);d(r,n)}catch(t){console.error("Error fetching clinics:",t),h(n)}}function d(n,t){const i=document.getElementById("clinicResults");if(n.length===0){i.innerHTML=`
      <div class="clinic-result">
        <h4>No clinics found in your exact area</h4>
        <p>Try a nearby zip code or visit the resources below for more options.</p>
        <a href="https://www.hrsa.gov/find-a-health-center" target="_blank" class="btn primary-btn btn-small">Search HRSA Website</a>
      </div>
    `;return}const r=n.map(e=>`
    <div class="clinic-result">
      <h4>${e.site_name||e.name||"Health Center"}</h4>
      <p><strong>Address:</strong> ${e.site_address||e.address||"Address not available"}</p>
      <p><strong>Phone:</strong> ${e.site_telephone||e.phone||"Phone not available"}</p>
      <p><strong>Services:</strong> Primary care, preventive services, and more</p>
      ${e.site_website?`<a href="${e.site_website}" target="_blank" class="btn primary-btn btn-small">Visit Website</a>`:""}
    </div>
  `).join("");i.innerHTML=`
    <h4>Clinics found near ${t}:</h4>
    ${r}
    <div class="clinic-result">
      <h4>Need more options?</h4>
      <p>Visit HRSA's official site for a comprehensive search with filters.</p>
      <a href="https://www.hrsa.gov/find-a-health-center" target="_blank" class="btn primary-btn btn-small">Search More Clinics</a>
    </div>
  `}function h(n){const t=document.getElementById("clinicResults");t.innerHTML=`
    <div class="clinic-result">
      <h4>Clinic Search</h4>
      <p>We couldn't load clinic data automatically. Here are reliable ways to find clinics near ${n}:</p>
      <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;">
        <a href="https://www.hrsa.gov/find-a-health-center" target="_blank" class="btn primary-btn btn-small">HRSA Health Centers</a>
        <a href="https://www.healthcare.gov/where-can-i-get-covered/" target="_blank" class="btn primary-btn btn-small">Healthcare.gov</a>
        <a href="https://www.plannedparenthood.org/health-center" target="_blank" class="btn primary-btn btn-small">Planned Parenthood</a>
      </div>
    </div>
  `}function o(n){const t=document.getElementById("clinicResults");t.innerHTML=`
    <div class="clinic-result" style="border-left-color: #ff6b6b;">
      <h4>Error</h4>
      <p>${n}</p>
    </div>
  `}
