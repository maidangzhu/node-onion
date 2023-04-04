async function getList(database) {
  return await database.all('SELECT * FROM todo')
  // return await database.all('SELECT * FROM todo WHERE state <> 2 ORDER BY state DESC')
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
