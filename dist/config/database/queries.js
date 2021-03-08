"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// GENERAL
exports.QUERY_INIT_TABLES = `CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(60) NOT NULL,
  password VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  description VARCHAR(100) NOT NULL,
  status VARCHAR(10) NOT NULL,
  priority smallint DEFAULT 1,
  created_at timestamp);`;
// USER
exports.QUERY_USER_BY_EMAIL = `SELECT * FROM users WHERE email = $1`;
exports.QUERY_USER_ID_BY_EMAIL = `SELECT id FROM users WHERE email = $1`;
exports.QUERY_USER_INSERT = `INSERT INTO users(email, name, password) VALUES ($1, $2, $3)`;
exports.QUERY_USER_DELETE = `DELETE FROM users WHERE id = $1`;
// TASK
exports.QUERY_GET_ALL_TASKS = `SELECT * FROM tasks LIMIT $1 OFFSET $2`;
exports.QUERY_TASK_INSERT = `INSERT INTO tasks(description, status, priority, created_at) VALUES ($1, $2, $3, $4)`;
exports.QUERY_USER_UPDATE_STATUS = `UPDATE tasks SET status = $1 WHERE id = $2`;
//# sourceMappingURL=queries.js.map