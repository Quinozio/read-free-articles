const isArticle = document.getElementById("article-body");

if (isArticle) {
  const articleUrl = `${window.location.href}`;
  fetch(articleUrl).then((response) =>
    response.text().then((data) => {
      setTimeout(() => {
        let article = getArticleFullText(data);
        const payWall = document.getElementsByClassName("paywall-adagio");
        const articleElement = document.getElementById("article-body");
        articleElement.style.overflow = "initial";
        articleElement.style.userSelect = "initial";
        articleElement.style.maxHeight = "initial";
        articleElement.innerHTML = article;
        if (payWall.length > 0) {
          payWall[0].remove();
        }
      }, 3000);
    })
  );
}
function getArticleFullText(data) {
  const initialString = `<div class="entry_content" id="article-body">`;
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
