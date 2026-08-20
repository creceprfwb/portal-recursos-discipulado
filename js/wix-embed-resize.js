/**
 * Shared Wix embed helper.
 *
 * Include with <script src="js/wix-embed-resize.js"></script> near the end
 * of <body> on every page that can be shown inside the Wix "HTML iframe"
 * embed. It has two jobs:
 *
 *   1. Tell the Wix wrapper the real content height (via postMessage) so
 *      Wix can grow the iframe to fit, instead of the iframe using its own
 *      fixed/short height and trapping the page's scroll inside itself.
 *   2. Mark <html> with "embedded-in-wix" and relax height/overflow rules
 *      that would otherwise fight with Wix's own scrolling page.
 *
 * The message type "DISCIPLESHIP_APP_HEIGHT" matches the listener already
 * configured on the Wix side (Velo HTML component) — keep it in sync if
 * that ever changes.
 */
(function () {
  var isEmbedded = window.self !== window.top;

  document.documentElement.classList.toggle("embedded-in-wix", isEmbedded);

  if (!isEmbedded) {
    return;
  }

  var style = document.createElement("style");
  style.textContent =
    "html.embedded-in-wix,\n" +
    "html.embedded-in-wix body {\n" +
    "  height: auto !important;\n" +
    "  min-height: 0 !important;\n" +
    "  overflow-y: visible !important;\n" +
    "}\n";
  document.head.appendChild(style);

  var lastHeight = 0;
  var sendScheduled = false;

  function getDocumentHeight() {
    return Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
  }

  function sendHeight() {
    sendScheduled = false;

    var height = getDocumentHeight() + 10;

    if (Math.abs(height - lastHeight) < 3) {
      return;
    }

    lastHeight = height;

    window.parent.postMessage(
      { type: "DISCIPLESHIP_APP_HEIGHT", height: height },
      "*"
    );
  }

  function scheduleSendHeight() {
    if (sendScheduled) {
      return;
    }

    sendScheduled = true;
    requestAnimationFrame(sendHeight);
  }

  window.addEventListener("load", sendHeight);
  window.addEventListener("resize", scheduleSendHeight);

  // Catches everything a plain load/resize listener would miss: images
  // that finish loading late, tabs/accordions, search/filter results,
  // data fetched from Firebase after the initial render, etc.
  if (typeof ResizeObserver !== "undefined") {
    var observer = new ResizeObserver(scheduleSendHeight);
    observer.observe(document.documentElement);
    observer.observe(document.body);
  }

  // Safety net for content that settles slightly after "load" fires.
  setTimeout(sendHeight, 100);
  setTimeout(sendHeight, 500);
  setTimeout(sendHeight, 1500);
})();
