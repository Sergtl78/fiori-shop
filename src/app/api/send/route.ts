import { emailHtml } from "@/lib/emails/htmlEmail";
import { MagicLinkEmail } from "@/lib/emails/MagicLinkEmail";
import { resend } from "@/lib/resend";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const RESEND_API_KEY = process.env.AUTH_RESEND_KEY


export async function POST(req:Request) {
 
  const body  = await req.json()
  const html=emailHtml(body)
  console.log(html);
  /* const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'info@devsergey.ru',
      to: body.to,
      subject: `Войти на сайт ${body.host}`,
      text: `Войти на сайт: ${body?.host}\n${body.urlForLink}\n\n`,
      html
    }),
  });

  if (res.ok) {
    const data = await res.json();
    console.log(data);
    
    return NextResponse.json(data);
  } */
  const res = await resend.emails.send({
      from: 'info@devsergey.ru',
      to: body.to,
      subject: `Войти на сайт ${body.host}`,
      text: `Войти на сайт: ${body.host}\n${body.url}\n\n`,
      react: MagicLinkEmail(body)
    })
    if (res.error) console.log( "Error resend",res.error);

  if (res.data) {
    return NextResponse.json(res.data);
  }
}
