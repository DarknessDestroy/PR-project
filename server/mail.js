import nodemailer from 'nodemailer'

let transporter = null

function isSmtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
}

function getTransporter() {
  if (transporter) return transporter

  if (!isSmtpConfigured()) {
    return null
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  return transporter
}

export async function sendConfirmationCodeEmail({ to, name, code }) {
  const from = process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@localhost'
  const subject = 'Код подтверждения регистрации'
  const html = `
    <div style="font-family: sans-serif; max-width: 480px; line-height: 1.5; color: #1e293b;">
      <h2 style="margin: 0 0 16px;">Здравствуйте, ${name}!</h2>
      <p>Для завершения регистрации введите код подтверждения на сайте:</p>
      <p style="margin: 24px 0; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1e293b;">
        ${code}
      </p>
      <p style="font-size: 14px; color: #64748b;">Код действует 15 минут. Если вы не регистрировались — проигнорируйте письмо.</p>
    </div>
  `
  const text = `Здравствуйте, ${name}!\n\nКод подтверждения регистрации: ${code}\n\nКод действует 15 минут.`

  const transport = getTransporter()

  if (!transport) {
    console.log('\n[email] SMTP не настроен. Код подтверждения:')
    console.log(code)
    console.log('')
    return { sent: false, devMode: true }
  }

  await transport.sendMail({ from, to, subject, html, text })
  return { sent: true, devMode: false }
}
