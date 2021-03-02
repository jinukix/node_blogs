const { ArticleService } = require("../services");
const { errorWrapper, errorGenerator } = require("../errors");
const { validateFields } = require("../utils");

const getArticles = errorWrapper(async (req, res) => {
  const articles = await ArticleService.findArticles(req.query);
  res.status(200).json({ articles });
});

const getOneArticle = errorWrapper(async (req, res) => {
  const { articleId } = req.params;

  const article = await ArticleService.findArticle({ id: articleId });
  if (article.delete_at) return res.status(200).json({ message: "Is Deleted" });

  res.status(200).json({ article });
});

const postOneArticle = errorWrapper(async (req, res) => {
  const { id: userId } = req.foundUser;
  const { title, body } = req.body;

  if ((!title, !body)) errorGenerator({ statusCode: 400 });

  const createdArticle = await ArticleService.createdArticle({
    userId,
    title,
    body,
  });

  res.status(201).json({ createdArticle });
});

const updateOneArticle = errorWrapper(async (req, res) => {
  const { id: userId } = req.foundUser;
  const requestedFields = req.body;
  const allowedFields = ["title", "body"];

  const isValidFields = validateFields(requestedFields, allowedFields);
  if (!isValidFields) errorGenerator({ statusCode: 400, message: "Invalid Requested Fields" });

  const updatedArticle = await ArticleService.updateArticle({
    userId,
    requestedFields,
  });

  res.status(201).json({ updatedArticle });
});

const publishOneArticle = errorWrapper(async (req, res) => {
  const { articleId } = req.params;
  const publishedArticle = await ArticleService.publishArticle(articleId);

  res.status(201).json({ publishedArticle });
});

const deleteOneArticle = errorWrapper(async (req, res) => {
  const { articleId } = req.params;
  const deletedArticle = await ArticleService.deleteArticle(articleId);

  res.status(201).json({ deletedArticle });
});

module.exports = {
  getArticles,
  getOneArticle,
  postOneArticle,
  updateOneArticle,
  publishOneArticle,
  deleteOneArticle,
};
