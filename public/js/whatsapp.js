// WhatsApp Button + Dynamic Message Logic
(function () {
  const phone = "919022180909";
  const defaultMessage = "Hi, I need help";
  const delay = 1000;

  // Open WhatsApp with a given message
  function openWhatsApp(message = "Hi, I have a query.") {
    const encodedMsg = encodeURIComponent(message);
    const waLink = `https://wa.me/${phone}?text=${encodedMsg}`;
    window.open(waLink, "_blank");
  }

  // Expose globally for item-specific use
  window.sendWhatsapp = openWhatsApp;

  // Create floating WhatsApp button
  const btn = document.createElement("div");
  btn.id = "whatsapp-btn";
  btn.className = "whatsapp-button";
  btn.style.display = "none";
  btn.setAttribute("role", "button");
  btn.setAttribute("tabindex", "0");
  btn.innerHTML = `<img src="https://img.icons8.com/ios-filled/50/ffffff/whatsapp.png" alt="Chat on WhatsApp" />`;
  document.body.appendChild(btn);

  // Show after delay and bind click
  setTimeout(() => {
    btn.style.display = "block";
    btn.addEventListener("click", () => openWhatsApp(defaultMessage));
  }, delay);
})();
