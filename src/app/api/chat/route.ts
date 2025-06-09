import { kv } from "@vercel/kv";

export async function POST(req: Request) {
  const { userId, message } = await req.json();

  const historyKey = `chat:${userId}`;
  const history = await kv.get(historyKey) as any[] || [];

  const messages = [...history, { role: "user", content: message }];

  const response = await fetch("https://api.together.xyz/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages,
    }),
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;

  await kv.set(historyKey, [...messages, { role: "assistant", content: reply }]);

  return Response.json({ reply });
}
