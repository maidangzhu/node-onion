const crypto = require('crypto')

const { setSession } = require('./session')

const sessionName = 'userInfo'

async function login(db, ctx, { name, password }) {
  const userInfo = await db.get(`SELECT *
                                 FROM user
                                 WHERE name = ?`, name)
  const salt = 'asdf' // 加盐
  const hash = crypto
    .createHash('sha256')
    .update(`${salt}${password}`)
    .digest()
    .toString('hex')
  if (userInfo && userInfo.password === hash) {
    const data = {
      id: userInfo.id,
      name: userInfo.name
    }
    await setSession(db, ctx, sessionName, data)
    return data
  }

  return null
}

module.exports = {
  login
}
