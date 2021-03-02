const { CommentService } = require("../services");
const { errorWrapper, errorGenerator } = require("../errors");

const getComments = errorWrapper(async (req, res) => {
  const { articleId } = req.params;

  const comments = await CommentService.fetchComments({ article_id: Number(articleId) });
  res.status(200).json({ comments });
});

const postComments = errorWrapper(async (req, res) => {
  const { articleId } = req.params;
  const { body } = req.body;
  const { id: userId } = req.foundUser;

  const createdComment = await CommentService.createComment({
    article_id: Number(articleId),
    user_id: userId,
    body,
  });

  res.status(201).json({ createdComment });
});

const updateComments = errorWrapper(async (req, res) => {
  const { commentId } = req.params;
  const { body } = req.body;

  const updatedComment = await CommentService.updateComment({
    comment_id: Number(commentId),
    body,
  });

  res.status(200).json({ updatedComment });
});

const deleteComments = errorWrapper(async (req, res) => {
  const { commentId } = req.params;

  const deletedComment = await CommentService.deleteComment({
    comment_id: Number(commentId),
  });

  res.status(200).json({ deletedComment });
});

module.exports = {
  getComments,
  postComments,
  updateComments,
  deleteComments,
};
