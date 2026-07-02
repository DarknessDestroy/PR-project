import { Router } from 'express'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import {
  confirmByEmailAndCode,
  findPendingByEmail,
  findUser,
  savePending,
} from '../store.js'
import { sendConfirmationCodeEmail } from '../mail.js'

const router = Router()
const CODE_TTL_MS = 15 * 60 * 1000

function generateCode() {
  return String(crypto.randomInt(100000, 1000000))
}

function normalizeEmail(email) {
  return email.trim().toLowerCase()
}

async function sendRegistrationCode({ email, name, passwordHash }) {
  const code = generateCode()
  const expiresAt = Date.now() + CODE_TTL_MS

  savePending({ email, name, passwordHash, code, expiresAt })

  const mailResult = await sendConfirmationCodeEmail({
    to: email,
    name,
    code,
  })

  return { code, mailResult }
}

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body ?? {}

    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ message: 'Заполните все поля' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Пароль должен быть не короче 6 символов' })
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({ message: 'Пароли не совпадают' })
    }

    const normalizedEmail = normalizeEmail(email)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ message: 'Некорректный email' })
    }

    if (findUser(normalizedEmail)) {
      return res.status(409).json({ message: 'Пользователь с таким email уже зарегистрирован' })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const { code, mailResult } = await sendRegistrationCode({
      email: normalizedEmail,
      name: name.trim(),
      passwordHash,
    })

    res.status(201).json({
      message: mailResult.sent
        ? 'Код подтверждения отправлен на ваш email'
        : 'Код подтверждения создан. SMTP не настроен — код выведен в консоль сервера',
      email: normalizedEmail,
      devMode: mailResult.devMode,
      ...(mailResult.devMode && { devCode: code }),
    })
  } catch (err) {
    console.error('[register]', err)
    res.status(500).json({ message: 'Ошибка при регистрации' })
  }
})

router.post('/confirm', async (req, res) => {
  try {
    const { email, code } = req.body ?? {}

    if (!email?.trim() || !code?.toString().trim()) {
      return res.status(400).json({ message: 'Введите email и код подтверждения' })
    }

    const normalizedEmail = normalizeEmail(email)
    const normalizedCode = code.toString().trim()

    if (!/^\d{6}$/.test(normalizedCode)) {
      return res.status(400).json({ message: 'Код должен состоять из 6 цифр' })
    }

    const result = confirmByEmailAndCode(normalizedEmail, normalizedCode)

    if (!result.ok) {
      const messages = {
        expired: 'Срок действия кода истёк. Зарегистрируйтесь снова',
        invalid: 'Неверный код подтверждения',
      }
      return res.status(400).json({ message: messages[result.reason] || messages.invalid })
    }

    res.json({
      message: 'Регистрация успешно завершена. Теперь можно войти',
      user: { email: result.email, name: result.name },
    })
  } catch (err) {
    console.error('[confirm]', err)
    res.status(500).json({ message: 'Ошибка при подтверждении' })
  }
})

router.post('/resend-code', async (req, res) => {
  try {
    const { email } = req.body ?? {}

    if (!email?.trim()) {
      return res.status(400).json({ message: 'Укажите email' })
    }

    const normalizedEmail = normalizeEmail(email)
    const pending = findPendingByEmail(normalizedEmail)

    if (!pending) {
      return res.status(404).json({ message: 'Заявка на регистрацию не найдена. Заполните форму снова' })
    }

    const { code, mailResult } = await sendRegistrationCode({
      email: pending.email,
      name: pending.name,
      passwordHash: pending.passwordHash,
    })

    res.json({
      message: mailResult.sent
        ? 'Новый код отправлен на email'
        : 'Новый код создан. SMTP не настроен — код в консоли сервера',
      devMode: mailResult.devMode,
      ...(mailResult.devMode && { devCode: code }),
    })
  } catch (err) {
    console.error('[resend-code]', err)
    res.status(500).json({ message: 'Не удалось отправить код' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body ?? {}

    if (!email?.trim() || !password) {
      return res.status(400).json({ message: 'Введите email и пароль' })
    }

    const normalizedEmail = normalizeEmail(email)

    if (findPendingByEmail(normalizedEmail)) {
      return res.status(403).json({
        message: 'Подтвердите email кодом из письма, чтобы завершить регистрацию',
        needsConfirmation: true,
        email: normalizedEmail,
      })
    }

    const user = findUser(normalizedEmail)

    if (!user) {
      return res.status(401).json({ message: 'Неверный email или пароль' })
    }

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      return res.status(401).json({ message: 'Неверный email или пароль' })
    }

    res.json({
      message: 'Вход выполнен',
      user: { email: user.email, name: user.name },
    })
  } catch (err) {
    console.error('[login]', err)
    res.status(500).json({ message: 'Ошибка при входе' })
  }
})

export default router
