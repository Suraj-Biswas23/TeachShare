// components/ContactForm.tsx

import React, { useState } from 'react';

interface ContactFormProps {
  onSubmit: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onSubmit();
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="name">
          Name
        </label>
        <input
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          id="name"
          type="text"
          placeholder="Your Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          id="email"
          type="email"
          placeholder="your@email.com"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="subject">
          Subject
        </label>
        <input
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          id="subject"
          type="text"
          placeholder="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="message">
          Message
        </label>
        <textarea
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          id="message"
          placeholder="Your message here..."
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
        ></textarea>
      </div>
      <div>
        <button
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          type="submit"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;