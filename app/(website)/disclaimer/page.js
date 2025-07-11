import Container from "@/components/container";

export const metadata = {
  title: "Disclaimer | Nature&apos;s Whispers",
  description: "Important disclaimers and limitations regarding the content and services provided by Nature&apos;s Whispers.",
};

export default function DisclaimerPage() {
  return (
    <Container>
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-brand-primary dark:text-brand-accent mb-8 text-center">
          Disclaimer
        </h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">
              General Information
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              The information on this website is provided on an &quot;as-is&quot; basis. To the fullest extent 
              permitted by law, Nature&apos;s Whispers excludes all representations, warranties, obligations, 
              and liabilities arising out of or in connection with the information provided on this website.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">
              Educational Content
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              The content on Nature&apos;s Whispers is intended for educational and informational purposes 
              only. While we strive to provide accurate and up-to-date information about nature, 
              wildlife, and environmental topics, we make no guarantees about the completeness, 
              reliability, or accuracy of this information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Wildlife and Outdoor Activities
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Any information provided about wildlife observation, outdoor activities, or nature 
              exploration should not be considered as professional advice. Always:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
              <li>Consult with local authorities and experts before engaging in outdoor activities</li>
              <li>Follow all local laws and regulations regarding wildlife and nature areas</li>
              <li>Take appropriate safety precautions when exploring natural environments</li>
              <li>Respect wildlife and maintain safe distances from all animals</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              External Links
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Our website may contain links to external websites that are not provided or maintained 
              by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any 
              information on these external websites and are not responsible for their content.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Photography and Images
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Images and photographs on this website are used for illustrative purposes. While we 
              strive to use appropriate and relevant imagery, the specific locations, species, or 
              conditions shown may not exactly match the content being discussed.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Conservation Information
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Information about conservation efforts, environmental issues, and wildlife protection 
              is provided for educational purposes. Conservation statuses and environmental conditions 
              can change rapidly, and readers should verify current information with relevant 
              scientific and conservation organizations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Nature&apos;s Whispers will not be liable for any direct, indirect, incidental, consequential, 
              or punitive damages arising out of your access to or use of the website, or any content 
              provided herein. This includes, but is not limited to, personal injury, property damage, 
              or any other damages resulting from outdoor activities or wildlife encounters.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              If you have any questions about this disclaimer, please contact us at{" "}
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