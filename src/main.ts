import navbar from "./includes/navbar.html?raw";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#navbar");
  if (container) container.innerHTML = navbar;

  // Clinic Finder Functionality
  const findClinicsBtn = document.getElementById('findClinics') as HTMLButtonElement;
  const zipCodeInput = document.getElementById('zipCode') as HTMLInputElement;

  if (findClinicsBtn && zipCodeInput) {
    findClinicsBtn.addEventListener('click', async () => {
      const zipCode = zipCodeInput.value.trim();

      if (!zipCode || zipCode.length !== 5 || !/^\d+$/.test(zipCode)) {
        showClinicError('Please enter a valid 5-digit zip code.');
        return;
      }

      findClinicsBtn.disabled = true;
      findClinicsBtn.textContent = 'Searching...';

      try {
        await findClinics(zipCode);
      } catch (error) {
        showClinicError('Unable to find clinics. Please try again or visit hrsa.gov directly.');
      } finally {
        findClinicsBtn.disabled = false;
        findClinicsBtn.textContent = 'Find Clinics';
      }
    });

    // Allow Enter key to search
    zipCodeInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        findClinicsBtn.click();
      }
    });
  }
});

async function findClinics(zipCode: string) {
  try {
    // Using HRSA's Find a Health Center API
    const response = await fetch(`https://findahealthcenter.hrsa.gov/widgets-data/widgets-data-v1.json`);

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();

    // Filter clinics by zip code (approximate location matching)
    const nearbyClinics = data.filter((clinic: any) => {
      return clinic.zip_code?.toString().startsWith(zipCode.substring(0, 3)) ||
             clinic.zip_code?.toString() === zipCode;
    }).slice(0, 5); // Limit to 5 results

    displayClinics(nearbyClinics, zipCode);

  } catch (error) {
    console.error('Error fetching clinics:', error);
    // Fallback: Show general clinic finder links
    showClinicFallback(zipCode);
  }
}

function displayClinics(clinics: any[], zipCode: string) {
  const clinicResults = document.getElementById('clinicResults') as HTMLDivElement;

  if (clinics.length === 0) {
    clinicResults.innerHTML = `
      <div class="clinic-result">
        <h4>No clinics found in your exact area</h4>
        <p>Try a nearby zip code or visit the resources below for more options.</p>
        <a href="https://www.hrsa.gov/find-a-health-center" target="_blank" class="btn primary-btn btn-small">Search HRSA Website</a>
      </div>
    `;
    return;
  }

  const resultsHtml = clinics.map(clinic => `
    <div class="clinic-result">
      <h4>${clinic.site_name || clinic.name || 'Health Center'}</h4>
      <p><strong>Address:</strong> ${clinic.site_address || clinic.address || 'Address not available'}</p>
      <p><strong>Phone:</strong> ${clinic.site_telephone || clinic.phone || 'Phone not available'}</p>
      <p><strong>Services:</strong> Primary care, preventive services, and more</p>
      ${clinic.site_website ? `<a href="${clinic.site_website}" target="_blank" class="btn primary-btn btn-small">Visit Website</a>` : ''}
    </div>
  `).join('');

  clinicResults.innerHTML = `
    <h4>Clinics found near ${zipCode}:</h4>
    ${resultsHtml}
    <div class="clinic-result">
      <h4>Need more options?</h4>
      <p>Visit HRSA's official site for a comprehensive search with filters.</p>
      <a href="https://www.hrsa.gov/find-a-health-center" target="_blank" class="btn primary-btn btn-small">Search More Clinics</a>
    </div>
  `;
}

function showClinicFallback(zipCode: string) {
  const clinicResults = document.getElementById('clinicResults') as HTMLDivElement;

  clinicResults.innerHTML = `
    <div class="clinic-result">
      <h4>Clinic Search</h4>
      <p>We couldn't load clinic data automatically. Here are reliable ways to find clinics near ${zipCode}:</p>
      <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;">
        <a href="https://www.hrsa.gov/find-a-health-center" target="_blank" class="btn primary-btn btn-small">HRSA Health Centers</a>
        <a href="https://www.healthcare.gov/where-can-i-get-covered/" target="_blank" class="btn primary-btn btn-small">Healthcare.gov</a>
        <a href="https://www.plannedparenthood.org/health-center" target="_blank" class="btn primary-btn btn-small">Planned Parenthood</a>
      </div>
    </div>
  `;
}

function showClinicError(message: string) {
  const clinicResults = document.getElementById('clinicResults') as HTMLDivElement;
  clinicResults.innerHTML = `
    <div class="clinic-result" style="border-left-color: #ff6b6b;">
      <h4>Error</h4>
      <p>${message}</p>
    </div>
  `;
}
