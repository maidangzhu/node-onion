const sessionKey = 'interceptor_js'

// 根据Cookie中的ID获取用户的Session
async function getSession(db, ctx, name) {
  const key = ctx.cookies[sessionKey]
  if (key) {
    const now = Date.now()
    const session = await db.get(`SELECT *
                                  FROM session
                                  WHERE key = ?
                                    AND name = ?
                                    AND expires > ?`,
      key, name, now)
    if (session) {
      return JSON.parse(session.value)
    }
  }
  return null
}

// 创建新的Session
async function setSession(db, ctx, name, data) {
  try {
    const key = ctx.cookies[sessionKey]
    if (key) {
      let result = await db.get('SELECT id FROM session WHERE key = ? AND name = ?', key, name)
      if (!result) {
        // 如果result不存在，那么插入这个session
        result = await db.run(`INSERT INTO session(key, name, value, created, expires)
                               VALUES (?, ?, ?, ?, ?)`,
          key,
          name,
          JSON.stringify(data),
          Date.now(),
          Date.now() + 7 * 86400 * 1000)
      } else {
        // 否则更新这个session
        result = await db.run(`UPDATE session
                               SET value = ?,
                                   created = ?,
                                   expires = ?
                               WHERE key = ?
                                 AND name = ?`,
          JSON.stringify(data),
          Date.now(),
          Date.now() + 7 * 86400 * 1000,
          key,
          name)
      }
      return { err: '', result }
    }
    throw new Error('invalid cookie')
  } catch (ex) {
    return { err: ex.message }
  }
}

module.exports = {
  getSession,
  setSession
}
