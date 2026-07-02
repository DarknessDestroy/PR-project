const pendingByEmail = new Map()
const usersByEmail = new Map()

export function findUser(email) {
  return usersByEmail.get(email.toLowerCase()) ?? null
}

export function findPendingByEmail(email) {
  return pendingByEmail.get(email.toLowerCase()) ?? null
}

export function savePending({ email, name, passwordHash, code, expiresAt }) {
  const key = email.toLowerCase()
  const record = { email: key, name, passwordHash, code, expiresAt }
  pendingByEmail.set(key, record)
  return record
}

export function confirmByEmailAndCode(email, code) {
  const pending = pendingByEmail.get(email.toLowerCase())
  if (!pending) return { ok: false, reason: 'invalid' }

  if (Date.now() > pending.expiresAt) {
    pendingByEmail.delete(pending.email)
    return { ok: false, reason: 'expired' }
  }

  if (pending.code !== code) {
    return { ok: false, reason: 'invalid' }
  }

  usersByEmail.set(pending.email, {
    email: pending.email,
    name: pending.name,
    passwordHash: pending.passwordHash,
    confirmedAt: Date.now(),
  })

  pendingByEmail.delete(pending.email)

  return { ok: true, email: pending.email, name: pending.name }
}
