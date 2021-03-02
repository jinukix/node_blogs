const { errorWrapper, errorGenerator } = require("../errors");
const { CommentService } = require("../services");

const checkUserComment = errorWrapper(async (req, res, next) => {
  const { articleId, commentId } = req.params;
  const comments = await CommentService.fetchComments({ article_id: Number(articleId) });

  const foundComment = comments.find((comment) => comment.id === Number(commentId));
  if (!foundComment) errorGenerator({ statusCode: 404, message: "Comment Not Found" });

  next();
});

module.exports = checkUserComment;
