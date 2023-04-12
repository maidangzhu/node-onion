async function getList(database) {
  return await database.all('SELECT * FROM todo')
}

async function addTask(database, { text, state }) {
  try {
    const data = await database.run('INSERT INTO todo(text,state) VALUES (?, ?)', text, state)
    return { err: '', data }
  } catch (ex) {
    return { err: ex.message }
  }
}

module.exports = {
  getList,
  addTask
}
