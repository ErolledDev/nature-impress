import Container from "@/components/container";
import Link from "next/link";
import { cx } from "@/utils/all";

export default function About({ authors, settings }) {
  return (
    <Container>
      <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-4">
        <h1 className="text-brand-primary mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight dark:text-white leading-tight">
          About Our Journey
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          We are passionate explorers of the natural world, dedicated to sharing the beauty and wonder of wildlife through captivating stories and stunning photography.
        </p>
      </div>

      <div className="mb-8 sm:mb-12 lg:mb-16 px-4">
        <div className="relative aspect-video sm:aspect-[21/9] lg:aspect-[3/1] overflow-hidden rounded-2xl shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
            alt="Beautiful forest landscape with misty mountains and tall trees - Nature's Whispers team exploring the wilderness"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
              Our Team in the Wild
            </h3>
            <p className="text-sm sm:text-base lg:text-lg opacity-90">
              Passionate explorers documenting nature's incredible stories
            </p>
          </div>
        </div>
      </div>

      <div className="prose prose-lg sm:prose-xl mx-auto text-center dark:prose-invert max-w-4xl px-4">
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            We believe in the power of nature to inspire, heal, and teach us about 
            the interconnectedness of all life. Through our stories and photography, 
            we aim to foster a deeper appreciation for the wild spaces that surround us.
          </p>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            Our mission is to document the beauty of untouched landscapes, the 
            fascinating behaviors of wildlife, and the urgent need for conservation 
            efforts to protect these precious ecosystems for future generations.
          </p>
          <div className="pt-2 sm:pt-4 lg:pt-6">
            <Link 
              href="/contact"
              className="inline-flex no-underline items-center px-4 sm:px-6 py-2 sm:py-2.5 lg:py-3 bg-brand-primary hover:bg-brand-secondary text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg text-sm sm:text-base">
              Connect with Nature
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}