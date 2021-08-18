const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const getDateUtc = () => dayjs.utc().format();

module.exports = getDateUtc;
