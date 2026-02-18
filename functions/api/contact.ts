export const onRequestPost = async ({ request, env }: any) => {
  try {
    const { name, email, phone, type, vehicle, message } =
      await request.json();

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Website <info@nocninebe.eu>",
        to: "info@nocninebe.eu",
        subject: "Nová poptávka z webu",
        reply_to: email,
        html: `
          <h2>Nová poptávka</h2>
          <p><strong>Jméno:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${phone}</p>
          <p><strong>Typ instalace:</strong> ${type}</p>
          ${vehicle ? `<p><strong>Vozidlo:</strong> ${vehicle}</p>` : ""}
          <p><strong>Zpráva:</strong><br/>${message}</p>
        `,
      }),
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ success: false }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ success: false }), {
      status: 500,
    });
  }
};