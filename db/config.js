// ＤB接続情報
const pgp = require('pg-promise')();
const cn = {
  host: 'db', // 'localhost' is the default;
  port: 5432, // 5432 is the default;
  database: 'dev',
  user: 'dev',
  password: 'password',

  // to auto-exit on idle, without having to shut-down the pool;
  // see https://github.com/vitaly-t/pg-promise#library-de-initialization
  allowExitOnIdle: true,
};

const db = pgp(cn); // database instance;
// console.log(db.connect());
module.exports.db = db;

// DBへのクエリ実行
const execute = async (db, sql, param) => {
  console.log('クエリ実行');
  console.log('param:', param);
  const results = await db.any(sql, param);
  return JSON.parse(JSON.stringify(results));
};
module.exports.execute = execute;
