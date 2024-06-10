import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export const ContactForm = () => {
  const templateID = process.env.template_key;
  const serviceID = process.env.service_key;
  const PublicKey = process.env.user_key;

  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formValues, setFormValues] = useState({
    senderName: "",
    senderEmail: "",
    subject: "",
    message: "",
  });

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .send(`${serviceID}`, `${templateID}`, formValues, {
        publicKey: PublicKey,
      })
      .then((res) => {
        setIsSending(false);
        setIsSent(true);
        console.log("Email sent successfully!", res);
        setFormValues({
          senderName: "",
          senderEmail: "",
          subject: "",
          message: "",
        });
      })
      .catch((err) => {
        setIsSending(false);
        setIsSent(false);
        console.error("Email failed to send", err);
      });
  };

  useEffect(() => {
    if (isSent) {
      setTimeout(() => {
        setIsSent(false);
      }, 3000);
    }
  }, [isSent]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.div
      whileInView={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-200 bg-opacity-20 border-2 text-gray-950 border-neutral-200 shadow-inner shadow-gray-800 p-6 rounded-lg"
    >
      <form onSubmit={sendEmail} className="space-y-4">
        <motion.input
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.5 }}
          required
          type="text"
          placeholder="Name"
          name="senderName"
          onChange={handleChange}
          value={formValues.senderName}
          className="w-full tracking-contactFormSpacing bg-slate-200 rounded-md py-3 px-4 text-sm outline-purple-200 text-gray-900 placeholder-gray-950"
        />
        <motion.input
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.5 }}
          required
          type="email"
          placeholder="Email"
          name="senderEmail"
          onChange={handleChange}
          value={formValues.senderEmail}
          className="w-full tracking-contactFormSpacing rounded-md py-3 px-4 text-sm bg-slate-50 outline-purple-200 text-gray-900 placeholder-gray-950"
        />
        {/* Dropdown Menu */}
        <motion.select
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.5 }}
          required
          name="subject"
          onChange={handleChange}
          value={formValues.subject}
          defaultValue={"General inquries"}
          className="w-full tracking-contactFormSpacing rounded-md py-3 px-3 text-sm outline-purple-200 text-gray-900 bg-slate-200"
        >
          <option
            className="bg-slate-200 text-base z-10 text-gray-950"
            value="General inquries"
          >
            General inquries
          </option>
          <option
            className="bg-slate-200 text-base z-10 text-gray-950"
            value="Project inquiries"
          >
            Project inquiries
          </option>
          <option
            className="bg-slate-200 text-base z-10 text-gray-950"
            value="Collaboration request"
          >
            Collaboration request
          </option>
          <option
            className="bg-slate-200 text-base z-10 text-gray-950"
            value="Feedback/Question"
          >
            Feedback/Question
          </option>
          <option
            className="bg-slate-200 text-base z-10 text-gray-950"
            value="Bug report"
          >
            Bug report
          </option>
          <option
            className="bg-slate-200 text-base z-10 text-gray-950"
            value="Feature request"
          >
            Feature request
          </option>
        </motion.select>
        <motion.textarea
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.5 }}
          placeholder="Message"
          rows={6}
          required
          name="message"
          onChange={handleChange}
          value={formValues.message}
          className="w-full tracking-contactFormSpacing bg-slate-50 rounded-md px-4 text-sm pt-3 outline-purple-200 text-gray-900 placeholder-gray-950"
        ></motion.textarea>
        <motion.button
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          whileHover={{
            scale: 1.05,
          }}
          type="submit"
          className="text-slate-100 bg-purple-500 hover:bg-purple-600 font-semibold rounded-md text-sm px-4 py-3 flex items-center justify-center w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16px"
            height="16px"
            fill="#fff"
            className="mr-2"
            viewBox="0 0 548.244 548.244"
          >
            <path
              fillRule="evenodd"
              d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
              clipRule="evenodd"
              data-original="#000000"
            />
          </svg>
          {isSending ? "Sending..." : isSent ? "Sent!" : "Send"}
        </motion.button>
      </form>
    </motion.div>
  );
};
