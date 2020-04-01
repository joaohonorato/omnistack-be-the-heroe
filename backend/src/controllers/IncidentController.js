const connection = require("../database/connection");

module.exports = {
  create: async (req, res) => {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;
    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id
    });
    return res.json({ id });
  },
  listAll: async (req, res) => {
    const { page = 1 } = req.query;
    const count = await connection("incidents")
      .count()
      .first();
    const incidents = await connection("incidents")
      .join("ong", "ong.id", "=", "incidents.ong_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select(["incidents.*", "ongs.name", "ongs.name", "ongs.email", "ongs.whatsapp", "ongs.city", "ongs.uf"]);

    res.header("X-Total-Count", count["count(*)"]);
    return res.json(incidents);
  },
  listByOng: async (req, res) => {
    const ong_id = req.headers.authorization;
    const incidents = await connection("incidents")
      .where("ong_id", ong_id)
      .select("*");
    return res.json(incidents);
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incidents = await connection("incidents")
      .where("id", id)
      .select("ong_id")
      .first();

    if (incidents && incidents.ong_id !== ong_id) {
      return res.status(401).json({
        error: "Operation not permited"
      });
    }

    await connection("incidents")
      .where("id", id)
      .delete();

    return res.status(204).send();
  }
};
