
const HUGGINGFACE_API_KEY = process.env.HF_TOKEN;
console.log("Hugging Face Token:", HUGGINGFACE_API_KEY);

async function query(data) {
  const API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-large"
  const response = await fetch(
    API_URL,
    {
      headers: {
        Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Hugging Face API error: ${errorText}`);
  }

  const result = await response.json();
  return result;
}




export async function POST(request) {
  console.log('API Route: Generate Quote Called');

  try {
    const requestBody = await request.json();
    console.log('Received Request Body:', requestBody);

    const { emoji } = requestBody;
    console.log('Generating quote for emoji:', emoji);

    // Modify prompt slightly to guide model output more precisely
    const payload = {
      inputs: `Generate a short and meaningful quote inspired by the word: ${emoji}.`
    };

    const quoteResponse = await query(payload);
    console.log('Hugging Face Response:', quoteResponse);

    // Extract only the meaningful quote after filtering out unnecessary instructions
    const rawQuote = quoteResponse[0]?.generated_text || "No quote generated";
    return Response.json({ quote: rawQuote });
  } catch (error) {
    console.error('FULL API error:', error);
    return Response.json(
      { message: 'Error generating quote', details: error.message },
      { status: 500 }
    );
  }
}


