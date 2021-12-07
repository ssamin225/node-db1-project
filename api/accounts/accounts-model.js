const db = require('../../data/db-config')

const getAll = async () => {
  // DO YOUR MAGIC
  const rows = await db('accounts')
    .select('id', 'name', 'budget')
  return rows
}

const getById = async id => {
  // DO YOUR MAGIC
  const [row] = await db('accounts')
    .where('id', id)
    .select('id', 'name', 'budget')
  return row
}

const create = async account => {
  // DO YOUR MAGIC
  const [id] = await db('accounts').insert(account)
  const newAcc = await getById(id)
  return newAcc
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  await db('accounts')
    .where('id', id)
    .update(account)

  const updated = await getById(id)
  return updated
}

const deleteById = async id => {
  // DO YOUR MAGIC
  await db('accounts')
    .where('id', id)
    .del()

  const deleted = `account with id ${id} got deleted`
  return deleted
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
