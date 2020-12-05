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

const isRepubblicaStandard = window.location.href.indexOf("repubblica") > -1;
const isRepubblicaWebapp = window.location.href.indexOf("rep.repubblica") > -1;

if (isRepubblicaStandard && !isRepubblicaWebapp) {
  const isArticle = document.getElementById("article-body");
  if (isArticle) {
    const articleUrl = `${window.location.href}`;
    fetch(articleUrl).then((response) =>
      response.text().then((data) => {
        setTimeout(() => {
          document.getElementsByTagName("html")[0].innerHTML = data;
        }, 3000);
      })
    );
  }
  function getArticleFullText(data) {
    const initialString = `<div class="story__content" id="article-body">`;
    const finalString = `<div class="paywall-adagio"`;
    let article = data.substring(
      data.indexOf(initialString),
      data.indexOf(finalString)
    );
    article = article.substring(
      initialString.length,
      article.length - "</div>".length
    );
    return article;
  }
}
if (isRepubblicaWebapp) {
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
