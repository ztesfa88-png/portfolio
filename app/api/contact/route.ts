import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

declare const process: { env: Record<string, string | undefined> }

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS

    // Dev fallback: log to console if SMTP not configured
    if (!smtpPass || smtpPass === 'your_app_password') {
      console.log('\n📬 New contact message (SMTP not configured):')
      console.log(`  From: ${name} <${email}>`)
      console.log(`  Message: ${message}\n`)
      return NextResponse.json({ success: true })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: { user: smtpUser, pass: smtpPass },
    })

    await transporter.sendMail({
      from: `"Portfolio Contact" <${smtpUser}>`,
      to: process.env.CONTACT_EMAIL || 'ztesfa88@gmail.com',
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <div style="font-family:monospace;max-width:600px;padding:32px;background:#0a0a0a;color:#f0f0f0;border-radius:8px;">
          <h2 style="color:#00ff88;margin-bottom:24px;">New Portfolio Contact</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border-color:#1e1e1e;margin:24px 0;" />
          <p><strong>Message:</strong></p>
          <p style="color:#aaa;line-height:1.8;">${message.replace(/\n/g, '<br/>')}</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
