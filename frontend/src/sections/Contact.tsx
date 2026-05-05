// import { useState } from "react";

// const Contact = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const handleChange = (e: any) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // const handleSubmit = (e: any) => {
//   //   e.preventDefault();
//   //   console.log(form);
//   //   // alert("Message sent!");

//   // };
//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     setLoading(true);
//     setSuccess(false);

//     try {
//       const response = await fetch("https://fullstack-portfolio-project-zirg.onrender.com/contact", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(form),
//       });

//       const data = await response.json();

//       if (data.success) {
//         setSuccess(true);
//         setForm({ name: "", email: "", message: "" });
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section id="contact" className="py-20 px-6 bg-white text-black">
//       <div className="max-w-xl mx-auto">
//         <h2 className="text-4xl font-bold text-center mb-10">Contact</h2>
//         <div className="mb-8 text-center space-y-2 hover:underline">
//           <p>
//             Email:
//             <a href="mailto:myspry@icloud.com" className="text-blue-500 ml-1">
//               myspry@icloud.com
//             </a>
//           </p>

//           <p>
//             GitHub:
//             <a
//               href="https://github.com/VictorSutac"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 ml-1 hover:underline"
//             >
//               github.com/VictorSutac
//             </a>
//           </p>

//           <p>
//             LinkedIn:
//             <a
//               href="https://www.linkedin.com/in/viktor-shutak-120346298"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 ml-1 hover:underline"
//             >
//               linkedin.com/in/viktor-shutak-120346298
//             </a>
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Your name"
//             value={form.name}
//             onChange={handleChange}
//             className="p-3 border rounded"
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Your email"
//             value={form.email}
//             onChange={handleChange}
//             className="p-3 border rounded"
//           />

//           <textarea
//             name="message"
//             placeholder="Your message"
//             value={form.message}
//             onChange={handleChange}
//             className="p-3 border rounded"
//           />

//           <button
//             disabled={loading}
//             className="bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition disabled:opacity-50"
//           >
//             {loading ? "Sending..." : "Send"}
//           </button>
//         </form>
//         {success && (
//           <p className="text-green-600 text-center mt-4">
//             Message sent successfully!
//           </p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Contact;
import { useState } from "react";

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      const response = await fetch(
        "https://fullstack-portfolio-project-zirg.onrender.com/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

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
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            className="p-3 border rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            className="p-3 border rounded"
          />

          <textarea
            name="message"
            placeholder="Your message"
            value={form.message}
            onChange={handleChange}
            className="p-3 border rounded"
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