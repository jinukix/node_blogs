const { query } = require("express");
const { errorGenerator } = require("../errors");
const prisma = require("../prisma");
const { makeQueryOption } = require("../utils");

const ARTICLES_DEFAULT_OFFSET = 0;
const ARTICLES_DEFAULT_LIMIT = 5;

const findArticles = (query) => {
  const { offset, limit } = query;

  return prisma.articles.findMany({
    skip: Number(offset) || ARTICLES_DEFAULT_OFFSET,
    take: Number(limit) || ARTICLES_DEFAULT_LIMIT,
    orderBy: {
      created_at: "desc",
    },
  });
};

const findArticle = (field) => {
  const [uniqueKey] = Object.keys(field);

  const isKeyId = uniqueKey === "id";
  const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey];

  return prisma.articles.findUnique({
    where: { [uniqueKey]: value },
    include: {
      users: {
        select: {
          id: true,
          email: true,
        },
      },
      comments: {
        where: {
          deleted_at: null,
        },
      },
    },
  });
};

const createdArticle = (field) => {
  const { userId: user_id, ...dataFields } = field;

  return prisma.articles.create({
    data: {
      ...dataFields,
      user_id,
    },
  });
};

const updateArticle = (fields) => {
  const { userId, requestedFields } = fields;

  return prisma.articles.update({
    where: {
      id: Number(userId),
    },
    data: {
      ...requestedFields,
      updated_at: new Date(),
    },
  });
};

const publishArticle = (userId) => {
  return prisma.articles.update({
    where: {
      id: Number(userId),
    },
    data: {
      status: "PUBLISHED",
      updated_at: new Date(),
    },
  });
};

const deleteArticle = (userId) => {
  return prisma.articles.update({
    where: {
      id: Number(userId),
    },
    data: {
      deleted_at: new Date(),
    },
  });
};

module.exports = {
  findArticles,
  findArticle,
  createdArticle,
  updateArticle,
  publishArticle,
  deleteArticle,
};
