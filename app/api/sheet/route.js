const deployment_url = "https://script.google.com/macros/s/AKfycbzA79xSNmUEaJ_Td4Z7lmT6l_0ji1IcUrwaUMd49sDGi-rg4cb5w_bpEiC7LSpvZIc/exec"

export async function GET(req) {
  try {
    const res = await fetch(deployment_url);

    if (!res.ok) {
      const text = await res.text();
      console.error("Apps Script error:", text);
      return new Response(JSON.stringify({ error: text }), { status: 500 });
    }
    const data = await res.json();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error("API route error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(req) {
  const body = await req.json();

  const res = await fetch(deployment_url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return res;
}
