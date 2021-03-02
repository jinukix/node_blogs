const express = require("express");
const router = express.Router();
const { ArticleController, CommentController } = require("../controllers");
const { validateToken, checkUserArticle, checkUserComment } = require("../middlewares");

// articles router
router.get("/", ArticleController.getArticles);
router.get("/:articleId", ArticleController.getOneArticle);
router.post("/", validateToken, ArticleController.postOneArticle);
router.put("/:articleId", validateToken, checkUserArticle, ArticleController.updateOneArticle);
router.put("/publish/:articleId", validateToken, checkUserArticle, ArticleController.publishOneArticle);
router.delete("/:articleId", validateToken, checkUserArticle, ArticleController.deleteOneArticle);

// comments router
router.get("/:articleId/comments", validateToken, CommentController.getComments);
router.post("/:articleId/comments", validateToken, CommentController.postComments);
router.put(
  "/:articleId/comments/:commentId",
  validateToken,
  checkUserArticle,
  checkUserComment,
  CommentController.updateComments,
);
router.delete(
  "/:articleId/comments/:commentId",
  validateToken,
  checkUserArticle,
  checkUserComment,
  CommentController.deleteComments,
);

module.exports = router;
