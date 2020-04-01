const connection = require("../database/connection");

module.exports = {
  create: async (req, res) => {
    const { id } = req.body;

    const ongName = await connection("incidents")
      .where("id", id)
      .select("name")
      .first();

    if (!ong) {
      return res.status(400).json({ error: "No Ong found with this ID" });
    }

    return res.json(ongName);
  }
};
