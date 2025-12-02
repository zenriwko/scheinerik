import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./ContactForm.module.css";

interface FormData {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  service: string;
  contactMethod: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    service: "",
    contactMethod: "email",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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

      // Reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        location: "",
        service: "",
        contactMethod: "email",
        message: "",
      });
    } catch (err: any) {
      setError(err.message);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>

      {/* Name + Email */}
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="name">Jméno</label>
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
          <label htmlFor="email">E-mail</label>
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
      </div>

      {/* Phone + Location */}
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="phone">Telefon (nepovinné)</label>
          <input
            id="phone"
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Např. +420 777 123 456"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="location">Místo / Lokalita</label>
          <input
            id="location"
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Např. Praha, Brno…"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="serviceType">Typ služby</label>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={handleChange}
            required
          >
            <option value="">Vyberte službu…</option>
            <option value="auto">Hvězdný strop do auta</option>
            <option value="interier">Hvězdný strop v interiéru</option>
            <option value="nabytkove">Ambientní osvětlení nábytku</option>
            <option value="jiny">Jiný projekt</option>
          </select>
        </div>
        
        <div className={styles.field}>
          <label htmlFor="contactMethod">Preferovaný kontakt</label>
          <select
            id="contactMethod"
            name="contactMethod"
            value={form.contactMethod}
            onChange={handleChange}
            required
          >
            <option value="">Vyberte možnost…</option>
            <option value="email">E-mail</option>
            <option value="telefon">Telefon</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
        </div>
      </div>
        

      {/* Message */}
      <div className={styles.field}>
        <label htmlFor="message">Zpráva</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          required
          placeholder="Popište nám svůj projekt…"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className={styles.button}
      >
        {status === "sending" ? "Odesílání…" : "Odeslat zprávu"}
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
