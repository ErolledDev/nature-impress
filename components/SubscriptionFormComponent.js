"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SubscriptionFormComponent({ settings }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting }
  } = useForm({
    mode: "onTouched"
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState(false);
  const [isLeanCloudReady, setIsLeanCloudReady] = useState(false);

  // Initialize LeanCloud once when component mounts
  useEffect(() => {
    const initLeanCloud = async () => {
      try {
        // Dynamically import LeanCloud SDK
        const AV = (await import('leancloud-storage')).default;
        
        // Get environment variables
        const appId = process.env.NEXT_PUBLIC_VALINE_APP_ID;
        const appKey = process.env.NEXT_PUBLIC_VALINE_APP_KEY;
        const serverURLs = process.env.NEXT_PUBLIC_VALINE_SERVER_URLS;

        if (!appId || !appKey) {
          throw new Error('LeanCloud configuration missing. Please check your environment variables.');
        }

        // Initialize LeanCloud only once
        AV.init({
          appId: appId,
          appKey: appKey,
          serverURL: serverURLs
        });

        // Store AV instance globally for use in form submission
        window.AV = AV;
        setIsLeanCloudReady(true);
      } catch (error) {
        console.error('Failed to initialize LeanCloud:', error);
        setMessage('Failed to initialize subscription service. Please try again later.');
        setIsSuccess(false);
      }
    };

    initLeanCloud();
  }, []); // Empty dependency array ensures this runs only once

  const handleFormSubmit = async (data) => {
    if (!isLeanCloudReady || !window.AV) {
      setMessage('Subscription service is not ready. Please try again in a moment.');
      setIsSuccess(false);
      return;
    }

    try {
      // Use the already initialized AV instance
      const AV = window.AV;

      // Add subscription metadata to the form data
      const subscriptionData = {
        ...data,
        name: data.name || '', // Optional name field
        subscription_type: "Newsletter",
        interests: "Nature stories, Wildlife photography, Conservation insights"
      };

      // Create a new subscription object in LeanCloud
      const Subscription = AV.Object.extend('Subscription');
      const subscription = new Subscription();

      // Set the subscription data
      subscription.set('email', subscriptionData.email);
      subscription.set('name', subscriptionData.name);
      subscription.set('subscriptionType', subscriptionData.subscription_type);
      subscription.set('interests', subscriptionData.interests);
      subscription.set('subscribedAt', new Date());
      subscription.set('status', 'active');
      subscription.set('source', 'website');

      // Save to LeanCloud
      await subscription.save();

      setIsSuccess(true);
      setMessage('Thank you for subscribing to Nature&apos;s Whispers! You&apos;ll receive our latest nature stories and wildlife insights.');
      reset();

    } catch (error) {
      console.error('Subscription error:', error);
      
      // Handle duplicate email error
      if (error.code === 137) {
        setIsSuccess(false);
        setMessage('This email is already subscribed to our newsletter.');
      } else {
        setIsSuccess(false);
        setMessage('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 dark:from-brand-primary/10 dark:to-brand-secondary/10 rounded-xl p-6 sm:p-8 border border-brand-primary/10 dark:border-brand-primary/20">
      <div className="text-center mb-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-brand-primary dark:text-brand-accent mb-3">
          Join Nature&apos;s Whispers Newsletter
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          Get the latest nature stories, wildlife photography, and conservation insights delivered to your inbox.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <input
          type="checkbox"
          id="newsletter-botcheck"
          className="hidden"
          style={{ display: "none" }}
          {...register("botcheck")}
        />

        <div>
          <label htmlFor="newsletter_email" className="sr-only">
            Email Address for Newsletter
          </label>
          <input
            id="newsletter_email"
            type="email"
            placeholder="Enter your email address"
            name="email"
            autoComplete="email"
            className={`w-full px-4 py-3 border-2 placeholder:text-gray-500 dark:text-white rounded-lg outline-none dark:placeholder:text-gray-400 dark:bg-gray-800 focus:ring-4 transition-all duration-200 ${
              errors.email
                ? "border-red-500 focus:border-red-500 ring-red-100 dark:ring-red-900/20"
                : "border-gray-300 focus:border-brand-primary ring-brand-primary/10 dark:border-gray-600 dark:focus:border-brand-accent dark:ring-brand-accent/10"
            }`}
            {...register("email", {
              required: "Email address is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Please enter a valid email address"
              }
            })}
          />
          {errors.email && (
            <div className="mt-2 text-red-500 text-sm">
              <small>{errors.email.message}</small>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isLeanCloudReady}
          className="w-full py-3 sm:py-4 font-semibold text-white transition-all duration-200 bg-brand-primary rounded-lg hover:bg-brand-secondary focus:outline-none focus:ring-4 focus:ring-brand-primary/20 disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] flex items-center justify-center">
          {!isLeanCloudReady ? (
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Initializing...</span>
            </div>
          ) : isSubmitting ? (
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Subscribing...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Subscribe to Newsletter</span>
            </div>
          )}
        </button>

        {isSubmitSuccessful && isSuccess && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-green-700 dark:text-green-300">
                {message}
              </div>
            </div>
          </div>
        )}
        
        {isSubmitSuccessful && !isSuccess && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-red-700 dark:text-red-300">
                {message}
              </div>
            </div>
          </div>
        )}
      </form>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}