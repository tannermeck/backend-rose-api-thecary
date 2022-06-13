const pool = require('../utils/pool');
const { Quote } = require('./Quote');

class Episode {
  id;
  title;
  season;
  number;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.number = row.number;
    this.season = row.season;
    this.quotes =
      row.quotes.length > 0 ? row.quotes.map((quote) => new Quote(quote)) : [];
  }

  static async getAll() {
    const { rows } =
      await pool.query(`SELECT episodes.id, episodes.title, episodes.season, episodes.number,
    COALESCE (
      jsonb_agg(to_jsonb(quotes))
      FILTER (WHERE quotes.id IS NOT NULL)
      , '[]') AS quotes
    FROM episodes 
    inner join quotes 
    ON quotes.episode_id = episodes.id
    GROUP BY episodes.id; `);
    return rows.map((row) => new Episode(row));
  }
}

module.exports = { Episode };
