import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

declare const process: { env: Record<string, string | undefined> }

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json()
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const { name, email, message } = body as Record<string, unknown>
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string' ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedMessage = message.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS

    if (!smtpUser || !smtpPass || smtpPass === 'your_app_password') {
      console.error('Contact API is missing valid SMTP_USER or SMTP_PASS configuration')
      return NextResponse.json(
        { error: 'Email delivery is not configured. Please try again later or email me directly.' },
        { status: 503 }
      )
    }

    const port = Number(process.env.SMTP_PORT) || 587
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port,
      secure: port === 465,
      auth: { user: smtpUser, pass: smtpPass },
    })

    await transporter.sendMail({
      from: `"Portfolio Contact" <${smtpUser}>`,
      to: process.env.CONTACT_EMAIL || 'ztesfa88@gmail.com',
      replyTo: trimmedEmail,
      subject: `New message from ${trimmedName}`,
      text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
