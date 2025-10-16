document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login.html';
    return;
  }

  try {
    const response = await fetch('/api/pods', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const { data: pods } = await response.json();
      const nearbyPodsContainer = document.querySelector('.flex-1.flex.flex-col.gap-4.overflow-y-auto');

      // Clear existing pods
      nearbyPodsContainer.innerHTML = '';

      pods.forEach(pod => {
        const podElement = document.createElement('div');
        podElement.className = 'flex items-center gap-4 p-3 rounded-lg bg-slate-100 dark:bg-slate-900/50 hover:bg-primary/10 dark:hover:bg-primary/10 transition-colors cursor-pointer';
        podElement.innerHTML = `
          <div class="w-20 h-20 rounded-lg bg-cover bg-center" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCrMbpU84UgjsslTS7R7Y7TzAI057zJODKCLXQ3KOgtDNcVbjFHUFkaVnX9iKxTF9Z58CPuz9wvvMeQxV_vXYHaOcL9bhQmhEp0orVD6VH0Dd-Z-jz_tYvxcOKfplgD9uFt2J6ZMyg2usSiJ3c5qZLJz2Cv0MkXbAatuLuIaqzrs2IJYB3oz4FwvvGnF0eXsbXyRgs_SbuvVAKWLYAjF8biM4WgHdRo5d7hplK9vDr-PYDKwrPMxIuJZutd9MLnqb0II3Vp3wyWTS-X");'></div>
          <div class="flex-1">
            <p class="font-bold text-slate-800 dark:text-slate-100">${pod.name}</p>
            <p class="text-sm ${pod.status === 'Available' ? 'text-green-500' : 'text-amber-500'}">${pod.status}</p>
          </div>
          <span class="material-symbols-outlined text-slate-400 dark:text-slate-500"> chevron_right </span>
        `;
        nearbyPodsContainer.appendChild(podElement);
      });
    } else {
      console.error('Failed to fetch pods');
    }
  } catch (error) {
    console.error('Error fetching pods:', error);
  }
});