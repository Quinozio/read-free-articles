function getRepubblicaArticle() {
  const newsApp = document.getElementsByTagName("news-app")[0];
  if (newsApp && newsApp.shadowRoot) {
    const newsArticle = newsApp.shadowRoot.querySelector(
      "iron-pages news-article"
    );
    if (newsArticle) {
      const ampElement = newsArticle.shadowRoot.querySelector(
        ".content amp-viewer .amp-doc-host"
      );
      if (ampElement) {
        return {
          ampElement,
          paywall: ampElement.shadowRoot.querySelector("body .paywall"),
        };
      }
    }
  }
  return { ampElement: null, paywall: null };
}

const isRepubblica = window.location.href.indexOf("repubblica") > -1;
if (isRepubblica) {
  document.addEventListener("DOMNodeInserted", () => {
    const { ampElement, paywall } = getRepubblicaArticle();
    if (paywall) {
      const article = paywall.innerHTML;
      if (article) {
        ampElement.shadowRoot.querySelector(
          "body .detail-article_body"
        ).innerHTML = article;
      }
    }
  });
}
