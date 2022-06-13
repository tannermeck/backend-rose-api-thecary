const pool = require('../utils/pool');

class Quote {
  id;
  detail;
  character_id;
  constructor(row) {
    this.id = row.id;
    this.detail = row.detail;
    this.character_id = row.character_id;
  }

  static async count() {
    const { rows } = await pool.query('SELECT COUNT(*) FROM quotes');
    return Number(rows[0].count);
  }

  static async insert({ detail, character_id, episode_id }) {
    const { rows } = await pool.query(
      'INSERT INTO quotes (detail, character_id, episode_id) VALUES ($1, $2, $3) RETURNING *',
      [detail, character_id, episode_id]
    );
    return new Quote(rows[0]);
  }
}

module.exports = { Quote };
