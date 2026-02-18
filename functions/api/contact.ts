export const onRequestPost = async ({ request, env }: any) => {
  try {
    const data = await request.json();
    console.log("Incoming form:", data);

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Website <info@nocninebe.eu>",
        to: "info@nocninebe.eu",
        subject: "Test submission",
        html: "<p>Test</p>",
      }),
    });

    console.log("Resend status:", response.status);

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log("Error:", err);
    return new Response(JSON.stringify({ success: false }), {
      status: 500,
    });
  }
};