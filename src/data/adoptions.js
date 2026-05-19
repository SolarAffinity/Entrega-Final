const { v4: uuidv4 } = require("uuid");

const adoptions = [
  {
    id: uuidv4(),
    company: "Solar Affinity",
    technology: "Paneles solares",
    region: "Santiago"
  }
];

module.exports = adoptions;
