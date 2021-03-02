require("dotenv").config;
const http = require("http");
const prisma = require("./prisma");
const { PORT } = process.env;
const app = require("./app");
const server = http.createServer(app);

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
  }
};

start();
