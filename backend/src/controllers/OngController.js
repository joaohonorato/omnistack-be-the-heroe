const crypto = require("crypto");
const connection = require("../database/connection");

module.exports = {
  create: async (req, res) => {
    const { name, email, whatsapp, city, uf } = req.body;
    const id = crypto.randomBytes(4).toString("HEX");
    await connection("ongs").insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });
    return res.json({ id });
  },
  list: async (req, res) => {
    const orgs = await connection("ongs").select("*");
    return res.json(orgs);
  }
};
