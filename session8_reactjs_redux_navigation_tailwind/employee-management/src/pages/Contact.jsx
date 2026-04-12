import React from "react";

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md mt-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        We’d love to hear from you! Whether you’re exploring training
        opportunities, have project feedback, or need assistance with employee
        management — feel free to get in touch with us.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-blue-800 mb-2">Our Office</h3>
        <p className="text-gray-700 leading-relaxed">
          <strong>Intellipaat Software Solutions Pvt. Ltd.</strong>
          <br />
          Primeco Towers, Arekere Gate, Junction, Bannerghatta Road,
          <br />
          Bengaluru, Karnataka – 560076
          <br />
          <span className="text-sm text-gray-500">India</span>
        </p>
      </div>

      <div className="space-y-3 text-gray-700">
        <p>
          <strong>Email:</strong>{" "}
          <a
            href="mailto:support@intellipaat.com"
            className="text-blue-700 hover:underline"
          >
            support@intellipaat.com
          </a>
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          <a
            href="tel:+919876543210"
            className="text-blue-700 hover:underline"
          >
            +91-9988776655
          </a>
        </p>
        <p>
          <strong>Working Hours:</strong> Monday to Friday (9:00 AM – 6:00 PM)
        </p>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-4 text-gray-500 text-sm text-center">
        © 2025 Intellipaat Employee Portal. All rights reserved.
      </div>
    </div>
  );
}
