export async function sendMessage(prompt) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",  // Current recommended Groq model (replaces llama3-70b-8192)
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 1,
      response_format: { type: "json_object" }  // Forces clean JSON output, no markdown fences
    })
  });

  const data = await res.json();

  if (!data.choices || data.choices.length === 0) {
    throw new Error("Groq API error: " + JSON.stringify(data.error));
  }

  return data.choices[0].message.content;
}