document.getElementById("cleanNow").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      const selectorsToRemove = [
        '[id*="ad"]', '[class*="ad"]', '[class*="ads"]', '[class*="sponsor"]', '[id*="sponsor"]',
        '[class*="popup"]', '[id*="popup"]', 'iframe[src*="ads"]',
        '[class*="banner"]', '[class*="cookie"]', '[class*="subscribe"]', '[class*="overlay"]'
      ];

      function smoothRemove(el) {
        if (!el || el.dataset.cleaned === "true") return;
        el.style.transition = 'opacity 0.4s ease, transform 0.3s ease';
        el.style.opacity = '0';
        el.style.transform = 'scale(0.95)';
        el.dataset.cleaned = "true";
        setTimeout(() => el.remove(), 400);
      }

      selectorsToRemove.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.height < window.innerHeight * 0.9) {
            smoothRemove(el);
          }
        });
      });
    }
  });
});
