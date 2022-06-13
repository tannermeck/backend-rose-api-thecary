const pool = require('../utils/pool');
const { Quote } = require('./Quote');

class Character {
  id;
  first_name;
  last_name;
  quotes;

  constructor(row) {
    this.id = row.id;
    this.first_name = row.first_name;
    this.last_name = row.last_name;
    this.quotes =
      row.quotes.length > 0 ? row.quotes.map((quote) => new Quote(quote)) : [];
  }

  static async getAll() {
    // implement getAll() method to return all characters with a list of quotes
    const { rows } =
      await pool.query(`SELECT characters.id, characters.first_name, characters.last_name,
    COALESCE (
      jsonb_agg(to_jsonb(quotes))
      FILTER (WHERE quotes.id is NOT NULL)
      , '[]') as quotes
    FROM characters
    LEFT JOIN quotes
    ON quotes.character_id = characters.id
    GROUP BY characters.id;`);
    return rows.map((row) => new Character(row));
  }
}

module.exports = Character;
