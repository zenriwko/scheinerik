import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./ContactForm.module.css";

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Send failed");

      setStatus("success");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.heading}>Kontaktujte nás</h2>

      <div className={styles.field}>
        <label htmlFor="name">Jméno*</label>
        <input
          id="name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Vaše jméno"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="phone">Telefon</label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Váš telefon"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="email">E-mail*</label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Váš e-mail"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Zpráva*</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          required
          placeholder="Vaše zpráva..."
        />
      </div>

      <button type="submit" disabled={status === "sending"} className={styles.button}>
        {status === "sending" ? "Odesílání..." : "Odeslat zprávu"}
      </button>

      {status === "success" && (
        <p className={styles.success}>✅ Zpráva byla úspěšně odeslána!</p>
      )}
      {status === "error" && (
        <p className={styles.error}>
          ❌ {error || "Něco se nepovedlo. Zkuste to prosím znovu."}
        </p>
      )}
    </form>
  );
}
