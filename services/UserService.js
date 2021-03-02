const prisma = require("../prisma");

const createUser = (fields) => {
  return prisma.users.create({ data: fields });
};

const findUser = (fields) => {
  const [uniqueKey] = Object.keys(fields);

  const isKeyId = uniqueKey === "id";
  const value = isKeyId ? Number(fields[uniqueKey]) : fields[uniqueKey];

  return prisma.users.findUnique({
    where: { [uniqueKey]: value },
  });
};

module.exports = {
  createUser,
  findUser,
};
