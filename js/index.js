window.addEventListener("load", () => {
  if (isIndexPage() && !checkSessionExpiry()) {
    openPopup();
  }
});