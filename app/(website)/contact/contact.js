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
  // Get the access key from environment variables
  const apiKey = settings?.w3ckey;

  // Show error message if no valid access key is configured
  if (!apiKey || apiKey === "YOUR_ACCESS_KEY_HERE") {
    return (
      <Container>
        <div className="text-center mb-6 sm:mb-8 lg:mb-12 px-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-brand-primary dark:text-white leading-tight mb-4 sm:mb-6">
            Connect with Nature
          </h1>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
              Contact Form Configuration Required
            </h2>
            <p className="text-red-700 dark:text-red-300 text-sm">
              Please configure your Web3Forms access key in the environment variables to enable the contact form.
              <br />
              <span className="font-mono text-xs">WEB3FORMS_ACCESS_KEY=your_actual_key_here</span>
            </p>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="text-center mb-6 sm:mb-8 lg:mb-12 px-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-brand-primary dark:text-white leading-tight mb-4 sm:mb-6">
        Connect with Nature
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Have a question about the wild? We are here to help.
        </p>
      </div>

      <div className="grid gap-8 lg:gap-12 my-6 sm:my-8 lg:my-12 md:grid-cols-2">
        <div className="space-y-6 sm:space-y-8">
          <h2 className="text-xl sm:text-2xl font-semibold dark:text-white">
            Contact Nature&apos;s Whispers
          </h2>
          <p className="max-w-sm text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            Want to share your nature experiences or ask about wildlife?
            We are here to connect. Fill up the form or send us an email.
          </p>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              <MapPinIcon className="w-4 h-4" />
              <span>Exploring the Wild, Everywhere</span>
            </div>
            {settings?.email && (
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                <EnvelopeIcon className="w-4 h-4" />
                <a href={`mailto:${settings.email}`} className="hover:text-brand-primary dark:hover:text-brand-accent transition-colors duration-200">
                  {settings.email}
                </a>
              </div>
            )}
            {settings?.phone && (
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                <PhoneIcon className="w-4 h-4" />
                <a href={`tel:${settings.phone}`} className="hover:text-brand-primary dark:hover:text-brand-accent transition-colors duration-200">
                  {settings.phone}
                </a>
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