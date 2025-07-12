import Container from "@/components/container";

export const metadata = {
  title: "Privacy Policy | Nature's Whispers",
  description: "Learn how Nature's Whispers collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <Container>
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-brand-primary dark:text-brand-accent mb-8 text-center">
          Privacy Policy
        </h1>
        
            Contact us at{" "}
            <a href="mailto:hello@natures-impress.erolledph.workers.dev" className="text-brand-primary hover:text-brand-secondary dark:text-brand-accent transition-colors duration-200">
              hello@natures-impress.erolledph.workers.dev
            </a>
            {" • "}
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We collect information you provide directly to us, such as when you create an account, 
              subscribe to our newsletter, or contact us. This may include your name, email address, 
              and any other information you choose to provide.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              We also automatically collect certain information about your device and how you interact 
              with our website, including your IP address, browser type, operating system, and browsing behavior.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
              <li>To provide, maintain, and improve our services</li>
              <li>To send you newsletters and updates about nature and wildlife</li>
              <li>To respond to your comments, questions, and requests</li>
              <li>To analyze usage patterns and improve user experience</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Information Sharing
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy. We may share your information 
              with trusted service providers who assist us in operating our website and conducting our business.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Cookies and Tracking
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              We use cookies and similar tracking technologies to enhance your browsing experience, 
              analyze website traffic, and understand where our visitors are coming from. You can 
              control cookies through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Data Security
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. However, no method of 
              transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Your Rights
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              You have the right to access, update, or delete your personal information. You may also 
              opt out of receiving promotional communications from us at any time by following the 
              unsubscribe instructions in those communications.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:hello@mydomain.com" className="text-brand-primary hover:text-brand-secondary dark:text-brand-accent transition-colors duration-200">
                hello@mydomain.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}