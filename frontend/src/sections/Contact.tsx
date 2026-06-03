import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Something went wrong. Please try again.");
        return;
      }

      setSuccess(true);
      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 bg-white text-black">
      <div className="max-w-xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">Contact</h2>

        <div className="mb-8 text-center space-y-2">
          <p>
            Email:
            <a href="mailto:myspry@icloud.com" className="text-blue-500 ml-1">
              myspry@icloud.com
            </a>
          </p>

          <p>
            GitHub:
            <a
              href="https://github.com/VictorSutac"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 ml-1 hover:underline"
            >
              github.com/VictorSutac
            </a>
          </p>

          <p>
            LinkedIn:
            <a
              href="https://www.linkedin.com/in/viktor-shutak-120346298"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 ml-1 hover:underline"
            >
              linkedin.com/in/viktor-shutak-120346298
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="name" className="font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={80}
            autoComplete="name"
            className="p-3 border rounded"
          />

          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            required
            maxLength={254}
            autoComplete="email"
            className="p-3 border rounded"
          />

          <label htmlFor="message" className="font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Your message"
            value={form.message}
            onChange={handleChange}
            required
            minLength={10}
            maxLength={2000}
            className="p-3 border rounded min-h-32"
          />

          <button
            disabled={loading}
            className="bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>

        {success && (
          <p className="text-green-600 text-center mt-4">
            Message sent successfully!
          </p>
        )}

        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      </div>
    </section>
  );
};

export default Contact;
