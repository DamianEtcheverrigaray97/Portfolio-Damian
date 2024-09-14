"use client";

import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { useState } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import emailjs from 'emailjs-com'; // Asegúrate de tener instalado emailjs-com
import ButtonSimple from "@/components/Button_simple";

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
        {slice.primary.heading}
      </Heading>
      
      {isFilled.richText(slice.primary.description) && (
        <div className="col-start-1 text-center mx-auto prose prose-xl prose-invert mb-10 mt-10">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}
      
      <form
        id="myForm"
        onSubmit={handleSubmit}
        className="mt-8 space-y-12 w-full max-w-2xl mx-auto rounded-lg" // Cambié max-w-lg por max-w-2xl y añadí w-full para mayor ancho
      >
        <div>
          <label
            htmlFor="emailFrom"
            className="block text-2xl font-bold text-gray-200 mb-23"
          >
            Email
          </label>
          <input
            type="email"
            id="emailFrom"
            name="emailFrom"
            value={formData.emailFrom}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-base"
            required
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-2xl font-bold text-gray-300 mb-2"
          >
            Asunto
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-base"
            required
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-2xl font-bold text-gray-200 mb-2"
          >
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="mt-2 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-base"
            required
          />
        </div>
        <div className="flex justify-end">
          <ButtonSimple
            label="Enviar"
            type="submit"
            className="w-auto px-12 py-3 bg-blue-600 font-bold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          />
        </div>
        


      </form>


    </Bounded>
  );
};

export default Contact;
