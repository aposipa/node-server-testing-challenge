const db = require('../data/dbConfig.js');

module.exports = {
    insert,
    update,
    remove,
    getAll,
    findById,
  };
  
  async function insert(users) {
    const [id] = await db("users").insert(users)
    return await db('users').where({ id }).first()
  }
  
  async function update(id, changes) {
    return null;
  }
  
  function remove(id) {
    return db("users")
        .where({ id })
        .del();
  }
  
  function getAll() {
    return db('users');
  }
  
  function findById(id) {
    return db('users')
    .where({ id })
    .first();
  }