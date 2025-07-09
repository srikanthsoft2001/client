import React, { useRef } from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import emailjs from 'emailjs-com';

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'date_time';
    hiddenInput.value = new Date().toLocaleString();
    form.current.appendChild(hiddenInput);

    emailjs.sendForm('service_b9g4zxo', 'template_47847x4', form.current, 'bgjtn1uHwo-KQmR-U').then(
      () => {
        alert('Message sent successfully!');
        form.current?.reset();
      },
      (error) => {
        alert('Failed to send the message. Please try again.');
        console.error(error);
      },
    );
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-8">
        <div className="space-y-8">
          <div className="p-6 rounded-lg hover:bg-gray-50 hover:scale-[1.01] transition-all duration-200">
            <h2 className="text-xl font-bold mb-4">Call To Us</h2>
            <p className="text-gray-600 mb-2">We are available 24/7, 7 days a week.</p>
            <p className="text-gray-600">Phone: +880161112222</p>
          </div>

          <div className="p-6 rounded-lg hover:bg-gray-50 hover:scale-[1.01] transition-all duration-200">
            <h2 className="text-xl font-bold mb-4">Write To Us</h2>
            <p className="text-gray-600 mb-2">
              Fill out our form and we will contact you within 24 hours.
            </p>
            <p className="text-gray-600 mb-1">Emails: customer@exclusive.com</p>
            <p className="text-gray-600">Emails: support@exclusive.com</p>

            <div className="mt-6 flex gap-4 text-xl text-gray-600">
              <FaFacebook className="hover:text-blue-600 cursor-pointer" />
              <FaInstagram className="hover:text-pink-600 cursor-pointer" />
              <FaTwitter className="hover:text-sky-500 cursor-pointer" />
            </div>

            {/* <div className="mt-6">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.4725391495917!2d78.44507637493592!3d17.4370828834586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90c8de8a46cd%3A0xe8e471a2c345f6f9!2sSathya%20Technologies!5e0!3m2!1sen!2sin!4v1747726999444!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div> */}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            <input
              type="text"
              name="from_name"
              placeholder="Your Name"
              required
              className="w-full p-3 border rounded"
            />
            <input
              type="email"
              name="from_email"
              placeholder="Your Email"
              required
              className="w-full p-3 border rounded"
            />
            {/* <input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              required
              pattern="\\d{10}"
              title="Enter a 10-digit phone number"
              className="w-full p-3 border rounded"
            /> */}
            <textarea
              name="message"
              rows={5}
              placeholder="Your Message"
              required
              className="w-full p-3 border rounded"
            ></textarea>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
