import Container from "@/components/container";

export const metadata = {
  title: "Terms of Service | Nature's Whispers",
  description: "Read the terms and conditions for using Nature's Whispers website and services.",
};

export default function TermsOfServicePage() {
  return (
    <Container>
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-brand-primary dark:text-brand-accent mb-8 text-center">
          Terms of Service
        </h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">
              Acceptance of Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              By accessing and using Nature&apos;s Whispers website, you accept and agree to be bound by 
              the terms and provision of this agreement. If you do not agree to abide by the above, 
              please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Use License
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Permission is granted to temporarily download one copy of the materials on Nature&apos;s 
              Whispers website for personal, non-commercial transitory viewing only. This is the 
              grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
              <li>modify or copy the materials</li>
              <li>use the materials for any commercial purpose or for any public display</li>
              <li>attempt to reverse engineer any software contained on the website</li>
              <li>remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Content Guidelines
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              When interacting with our website, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
              <li>Provide accurate and truthful information</li>
              <li>Respect the intellectual property rights of others</li>
              <li>Not post harmful, offensive, or inappropriate content</li>
              <li>Not engage in any activity that could harm our website or services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Disclaimer
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              The materials on Nature&apos;s Whispers website are provided on an &apos;as is&apos; basis. Nature&apos;s 
              Whispers makes no warranties, expressed or implied, and hereby disclaims and negates 
              all other warranties including without limitation, implied warranties or conditions of 
              merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Limitations
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              In no event shall Nature&apos;s Whispers or its suppliers be liable for any damages 
              (including, without limitation, damages for loss of data or profit, or due to business 
              interruption) arising out of the use or inability to use the materials on Nature&apos;s 
              Whispers website, even if Nature&apos;s Whispers or its authorized representative has been 
              notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Revisions and Errata
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              The materials appearing on Nature&apos;s Whispers website could include technical, 
              typographical, or photographic errors. Nature&apos;s Whispers does not warrant that any 
              of the materials on its website are accurate, complete, or current.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              If you have any questions about these Terms of Service, please contact us at{" "}
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
