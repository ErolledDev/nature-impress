"use client";

import Container from "@/components/container";
import { useState, Suspense, lazy } from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon
} from "@heroicons/react/24/outline";

// Dynamically import the ContactForm component with ssr: false
const ContactForm = dynamic(() => import('./ContactFormComponent'), {
  ssr: false,
  loading: () => (
    <div className="my-10 animate-pulse">
      <div className="mb-5">
        <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
      </div>
      <div className="mb-5">
        <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
      </div>
      <div className="mb-5">
        <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
      </div>
      <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
    </div>
  )
});

export default function Contact({ settings }) {
  // Please update the Access Key in the environment variables
  const apiKey = settings?.w3ckey || "YOUR_ACCESS_KEY_HERE";

  return (
    <Container>
      <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
        Connect with Nature
      </h1>
      <div className="text-center">
        <p className="text-lg">Have a question about the wild? We are here to help.</p>
      </div>

      <div className="grid my-10 md:grid-cols-2">
        <div className="my-10">
          <h2 className="text-2xl font-semibold dark:text-white">
            Contact Nature&apos;s Whispers
          </h2>
          <p className="max-w-sm mt-5">
            Want to share your nature experiences or ask about wildlife?
            We are here to connect. Fill up the form or send us an email.
          </p>

          <div className="mt-5">
            <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
              <MapPinIcon className="w-4 h-4" />
              <span>Exploring the Wild, Everywhere</span>
            </div>
            {settings?.email && (
              <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
                <EnvelopeIcon className="w-4 h-4" />
                <a href={`mailto:${settings.email}`}>
                  {settings.email}
                </a>
              </div>
            )}
            {settings?.phone && (
              <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
                <PhoneIcon className="w-4 h-4" />
                <a href={`tel:${settings.phone}`}>{settings.phone}</a>
              </div>
            )}
          </div>
        </div>
        <div>
          <ContactForm settings={settings} apiKey={apiKey} />
        </div>
      </div>
    </Container>
  );
}
