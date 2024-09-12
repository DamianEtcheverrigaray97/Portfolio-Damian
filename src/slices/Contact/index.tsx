"use client";

import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import emailjs from 'emailjs-com'; // Asegúrate de tener instalado emailjs-com

/**
 * Props for `Contact`.
 */
export type ContactProps = SliceComponentProps<Content.ContactSlice>;

/**
 * Component for "Contact" Slices.
 */
const Contact = ({ slice }: ContactProps): JSX.Element => {
  const [formData, setFormData] = useState({
    username: "",
    emailFrom: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const service_id = slice.primary.service_id as string;
    const template_id = slice.primary.template_id as string;
    const public_key = slice.primary.public_key as string;

    // Enviar el formulario usando emailjs
    emailjs.sendForm(service_id, template_id, '#myForm', public_key)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);

        // Limpiar el formulario después de un envío exitoso
        setFormData({
          username: "",
          emailFrom: "",
          subject: "",
          message: "",
        });
      })
      .catch((error) => {
        console.log('FAILED...', error);
      });
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading size="xl" className="col-start-1 text-center">
        Get in Touch
      </Heading>

      <form
        id="myForm" // Identificador para emailjs.sendForm
        onSubmit={handleSubmit}
        className="mt-8 space-y-6 max-w-lg mx-auto"
      >
        <div>
          <label htmlFor="username" className="block text-base font-medium text-gray-700 dark:text-white">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white text-base"
            required
          />
        </div>

        <div>
          <label htmlFor="emailFrom" className="block text-base font-medium text-gray-700 dark:text-white">
            Email
          </label>
          <input
            type="text"
            id="emailFrom"
            name="emailFrom"
            value={formData.emailFrom}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white text-base"
            required
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-base font-medium text-gray-700 dark:text-white">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white text-base"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-base font-medium text-gray-700 dark:text-white">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="mt-2 block w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white text-base"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-base"
          >
            Send Message
          </button>
        </div>
      </form>
    </Bounded>
  );
};

export default Contact;
