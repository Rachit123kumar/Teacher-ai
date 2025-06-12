import { connectToDatabase } from "@/lib/mongodb";
import { Message } from "@/models/Post";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from 'resend';

// Define schema using Zod
const Schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});


export async function POST(req: NextRequest) {
  const body = await req.json();


  const parseResult = Schema.safeParse(body);

  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.errors },
      { status: 400 }
    );
  }

  const { name, email, message } = parseResult.data;


  await connectToDatabase();

  // Save to DB logic 
  try {
    const newMessage = await Message.create({
      name,
      email,
      message
    })

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['hellobittukumar12@gmail.com'],
      subject: 'A user has messaged you',
      html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #0070f3;">📩 New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Message:</strong></p>
      <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #ddd;">
        ${message.replace(/\n/g, "<br/>")}
      </div>
      <hr style="margin-top: 30px;" />
      <footer style="font-size: 12px; color: #888;">
        This message was sent from your contact form.
      </footer>
    </div>
  `
    });


    return NextResponse.json(
      newMessage

    );




  } catch (err) {

    console.log(err)
    return NextResponse.json({
      message: "error occured while sending message"
    }, {
      status: 400
    }
    );
  }



}
