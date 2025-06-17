import { getContext } from "@/lib/context";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";


const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY!, // Replace with your actual API key
});


export async function POST(req: NextRequest) {




    try {
        const body = await req.json();
        const { messages, fileKey } = body

        const context = await getContext(messages[0].content, fileKey)
        // console.log(context, "I am from backend /n")





        const res = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: 'system',
                    content: `
You are an AI assistant.
Use the content below to answer the user's question.

START CONTENT BLOCK
${context}
END CONTENT BLOCK

If the content doesn’t answer the question, say: “I’m sorry, I don’t know.”
Do not make up answers.
    `,
                },
                {
                    role: 'user',
                    content: messages[0].content  // user's actual question
                }
            ]



        })
        // console.log(context)
        return Response.json({ response: res.choices[0].message.content })


    } catch (err) {
        // console.log(err)
        return NextResponse.json({
            error: "error"
        }, {
            status: 400
        })
    }
}