"use client";
import { useState } from "react";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    vehicle: "",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        type: "",
        vehicle: "",
        message: "",
      });

      setTimeout(() => setSuccess(false), 4000);
    } else {
      alert("Odeslání selhalo.");
    }
  }

  const isCar =
    form.type === "Strop automobilu" ||
    form.type === "Interiér automobilu";

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Nezávazná poptávka</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          placeholder="Jméno"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Telefon"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <select
          id="type"
          name="type"
          required
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
        >
          <option value="">Vyberte typ instalace</option>
          <option value="Strop automobilu">Strop automobilu</option>
          <option value="Interiér automobilu">Interiér automobilu</option>
          <option value="Nábytek">Nábytek</option>
          <option value="Předmět">Předmět</option>
        </select>

        {isCar && (
          <input
            id="vehicle"
            name="vehicle"
            autoComplete="off"
            placeholder="Značka a model vozidla"
            value={form.vehicle}
            onChange={(e) =>
              setForm({ ...form, vehicle: e.target.value })
            }
          />
        )}

        <textarea
          id="message"
          name="message"
          autoComplete="off"
          required
          placeholder="Zpráva"
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
        />

        <button type="submit" disabled={loading}>
          {loading ? "Odesílám..." : "Odeslat poptávku"}
        </button>
      </form>

      <div
        className={`${styles.success} ${
          success ? styles.show : ""
        }`}
      >
        ✨ Vaše zpráva byla úspěšně odeslána.
      </div>
    </div>
  );
}