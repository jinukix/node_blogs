const { errorWrapper, errorGenerator } = require("../errors");
const { ArticleService } = require("../services");

const checkUserArticle = errorWrapper(async (req, res, next) => {
  const { articleId } = req.params;
  const { id: userId } = req.foundUser;

  const foundArticle = await ArticleService.findArticle({ id: articleId });
  if (!foundArticle) errorGenerator({ statusCode: 404, message: "Article Not Found" });

  const { user_id: userIdFromArticle } = foundArticle;
  if (userId !== userIdFromArticle) errorGenerator({ statusCode: 403, message: "Un Authorized" });

  next();
});

module.exports = checkUserArticle;
