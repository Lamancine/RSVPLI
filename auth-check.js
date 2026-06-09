/**
 * Page Protection - Redirects to gatekeeper if guest not verified
 * Include this in all pages that should be protected
 */

(function() {
  // Check if guest is verified
  function isGuestVerified() {
    const stored = localStorage.getItem("_wedding_guest");
    return stored ? JSON.parse(stored) : null;
  }

  // If not verified, redirect to gatekeeper
  if (!isGuestVerified()) {
    window.location.href = "gatekeeper.html";
  }

  // Add logout functionality
  function attachLogoutHandler() {
    document.querySelectorAll("[id='logoutBtn']").forEach(logoutBtn => {
      logoutBtn.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        logout();
        return false;
      });
    });
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachLogoutHandler);
  } else {
    attachLogoutHandler();
  }

  // Also try to attach when window loads
  window.addEventListener("load", attachLogoutHandler);
})();

/**
 * Logout - Clear guest verification and redirect to gatekeeper
 */
function logout() {
  localStorage.removeItem("_wedding_guest");
  localStorage.removeItem("_wedding_language");
  localStorage.removeItem("_wedding_content");
  window.location.href = "gatekeeper.html";
  return false;
}
