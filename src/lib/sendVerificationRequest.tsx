'use server'
import { NodemailerConfig } from 'next-auth/providers/nodemailer'
import { MagicLinkEmail } from './emails/MagicLinkEmail'
import { resend } from './resend'
type ParamsType = {
  identifier: string
  url: string
  
}


function text({ url, host }: { url: string; host: string }) {
  return `Войти на сайт: ${host}\n${url}\n\n`
}

export async function sendVerificationRequest(params: ParamsType) {
  const { identifier, url } = params
  const host = process.env.NEXT_PUBLIC_SITE_URL
  

  const res= await fetch(`${host}/api/send`, {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'info@devsergey.ru',
      to: [identifier],
      url: url,
      host
    })
  })
if (!res.ok)
  throw new Error("Resend error: " + JSON.stringify(await res.json()))
  
} 
