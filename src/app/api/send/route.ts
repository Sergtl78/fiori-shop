import { MagicLinkEmail } from "@/lib/emails/MagicLinkEmail";
import { resend } from "@/lib/resend";
import {  NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";



export async function POST(req:Request) {
 
  const body  = await req.json()
  
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
