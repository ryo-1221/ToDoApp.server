require('dotenv').config();
const { join: joinPath } = require('path');

// ＤB接続情報
const pgp = require('pg-promise')();
const cn = {
  host: process.env.DB_HOST, // 'localhost' is the default;
  port: process.env.DB_PORT, // 5432 is the default;
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  // to auto-exit on idle, without having to shut-down the pool;
  // see https://github.com/vitaly-t/pg-promise#library-de-initialization
  allowExitOnIdle: true,
};
// console.log(cn);
const db = pgp(cn); // database instance;
// console.log(db.connect());
module.exports.db = db;

// sqlディレクトリのyamlファイル内のSQLをsqlidで紐づけ
const sql = (filename, sqlid) => {
  const fullPath = joinPath('sql/', filename + '.yaml'); // generating full path;
  const fs = require('fs');
  const yaml = require('js-yaml');
  const yamlText = fs.readFileSync(fullPath, 'utf8');

  const sql = yaml.load(yamlText)[sqlid][0];
  return sql;
};
module.exports.sql = sql;

// DBへのクエリ実行
const execute = async (db, sql, param) => {
  console.log('クエリ実行');
  const results = await db.any(sql, param);
  return JSON.parse(JSON.stringify(results));
};
module.exports.execute = execute;
