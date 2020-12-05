const isGazzettinoOrMessaggero =
  window.location.href.indexOf("gazzettino") > -1 ||
  window.location.href.indexOf("ilmessaggero") > -1;

if (isGazzettinoOrMessaggero) {
  document.addEventListener("DOMNodeInserted", () => {
    const hasPaywallWrapper = document.getElementById("paywall_wrapper");

    if (hasPaywallWrapper) {
      hasPaywallWrapper.remove();
      const body = document.getElementsByTagName("body")[0];
      body.style.overflow = "initial";
    }
  });
}
