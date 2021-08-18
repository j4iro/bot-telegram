const mongoose = require("mongoose");

const connect = mongoose.connect(process.env.MONGO_DB_CONECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

module.exports = { connect: () => connect };
