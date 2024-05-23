'use server'
import { NodemailerConfig } from 'next-auth/providers/nodemailer'
import MagicLinkEmail from './emails/MagicLinkEmail'
import { resend } from './resend'

type ParamsType = {
  identifier: string
  url: string
  expires: Date
  provider: NodemailerConfig
  token: string
  request: Request
}
export async function sendVerificationRequest(params: ParamsType) {
  const { identifier, url, provider } = params

  const { host } = new URL(url)
  console.log(host)
  console.log(url)

  try {
    const data = await resend.emails.send({
      from: 'info@devsergey.ru',
      to: [identifier],
      subject: `Войти на сайт ${host}`,
      text: text({ url, host }),
      react: MagicLinkEmail({ url, host })
    })
    //return { success: true, data }
  } catch (error) {
    throw new Error('Failed to send the verification Email.')
  }
}

function text({ url, host }: { url: string; host: string }) {
  return `Войти на сайт: ${host}\n${url}\n\n`
}
