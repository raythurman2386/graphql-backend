require('dotenv').config();
import pg from 'pg';

const localPg = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
};

if (process.env.NODE_ENV === 'production') {
  pg.defaults.ssl = true;
}

const postgres = {
  client: 'pg',
  useNullAsDefault: true,
  migrations: {
    directory: './data/migrations'
  },
  seeds: {
    directory: './data/seeds'
  }
};

module.exports = {
  development: {
    ...postgres,
    connection: process.env.DATABASE_URL || localPg
  },

  test: {
    ...postgres,
    connection: localPg
  },

  production: {
    ...postgres,
    connection: process.env.DATABASE_URL
  }
};
