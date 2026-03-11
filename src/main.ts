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
  // For now, show fallback with useful links since the API might have CORS issues
  showClinicFallback(zipCode);
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
