import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/shared/SEO";
import { SITE_CONFIG, createBreadcrumbSchema } from "@/lib/seo-config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const services = [
  {
    number: "01",
    title: "UI/UX & Interface Design",
    description: "Turning product ideas into clear, functional interface directions through thoughtful user flows, component planning, responsive layouts, and accessible interaction patterns.",
    includes: [
      "Responsive user interface design",
      "Design systems & component libraries",
      "Information architecture & user flows",
      "Accessible interactions & typography",
      "Multi-theme visual systems",
    ],
    idealFor: "Startups and products needing intuitive, distinctive, and clean interfaces.",
  },
  {
    number: "02",
    title: "Frontend Web Development",
    description: "Building modern, high-performance web applications using React, Next.js, Astro, and TypeScript with strong attention to performance, Core Web Vitals, and responsive behavior.",
    includes: [
      "React, Next.js & Astro architecture",
      "TypeScript component development",
      "Core Web Vitals & performance tuning",
      "Interactive states & animations",
      "Semantic HTML & technical SEO",
    ],
    idealFor: "Teams and creators wanting fast, production-ready frontend web experiences.",
  },
  {
    number: "03",
    title: "Product Prototyping & Full-Stack",
    description: "Exploring complete application flows from user inputs, data validation, and APIs to database modeling, authentication, state management, and reliable deployment.",
    includes: [
      "End-to-end web app prototyping",
      "REST API integration & routes",
      "Database modeling (Supabase, PostgreSQL)",
      "Authentication patterns & data validation",
      "Continuous deployment pipelines",
    ],
    idealFor: "Founders and developers moving from early concept to working software.",
  },
  {
    number: "04",
    title: "Developer Tooling & Utilities",
    description: "Crafting browser-native utilities, local-first computing tools, and AI-assisted workflows that prioritize user privacy, direct accessibility, and zero-friction onboarding.",
    includes: [
      "In-browser IDE & code sandbox design",
      "Client-side processing (Workers, Canvas, IndexedDB)",
      "Markdown publishing & PDF generation",
      "AI-assisted workflows & BYOK architecture",
      "Technical documentation & developer guides",
    ],
    idealFor: "Builders seeking privacy-conscious utilities and developer tools.",
  },
];

const process = [
  {
    step: "01",
    title: "Define the Problem",
    description: "Identify the user, the core task, existing friction points, and what a successful outcome must achieve.",
  },
  {
    step: "02",
    title: "Architecture",
    description: "Establish the simplest working foundation: determine local-first vs backend needs, data boundaries, and tech stack.",
  },
  {
    step: "03",
    title: "Interface Design",
    description: "Craft clear hierarchy, responsive layouts, accessible typography, and intuitive interaction patterns.",
  },
  {
    step: "04",
    title: "Build & Iterate",
    description: "Implement in small reviewable increments, testing edge cases, browser constraints, and real interactions.",
  },
  {
    step: "05",
    title: "Deploy & Measure",
    description: "Ship clean code with documentation, SEO setup, and performance auditing, learning from real-world usage.",
  },
];

const faqs = [
  {
    question: "What types of projects do you take on?",
    answer: "I specialize in UI/UX design, modern frontend development (React, Next.js, Astro, TypeScript), full-stack product prototypes, and browser-first developer tools.",
  },
  {
    question: "What does privacy-first and local-first architecture mean?",
    answer: "It means prioritizing client-side execution, Web Workers, and local persistence (like IndexedDB) so user files and data remain on their own device whenever technically practical, avoiding unnecessary server uploads.",
  },
  {
    question: "Do you collaborate with clients or teams remotely?",
    answer: "Yes. I am based in Pune, Maharashtra, India, and work with developers, founders, and teams remotely using GitHub, modern collaboration tools, and structured communication.",
  },
  {
    question: "How do you integrate AI into software development?",
    answer: "I use AI as a development accelerator for implementation, testing, and exploration while preserving human review, verifiable architectures, and transparent third-party API boundaries (like BYOK designs).",
  },
];

export default function Services() {
  const servicesSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${SITE_CONFIG.siteUrl}/services#service`,
        "name": "Design & Engineering Services by Girish Lade",
        "provider": {
          "@type": "Person",
          "name": SITE_CONFIG.name,
          "url": SITE_CONFIG.siteUrl,
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Development & Design Capabilities",
          "itemListElement": services.map((s, index) => ({
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": s.title,
              "description": s.description,
            },
            "position": index + 1,
          })),
        },
      },
      createBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
      ]),
    ],
  };

  return (
    <Layout>
      <SEO
        title="Services & Capabilities | UI/UX Design, React & Developer Tools"
        description="Comprehensive engineering & design capabilities: UI/UX interface design, frontend web development (React, TypeScript), product prototyping, and developer tooling."
        canonical="/services"
        schema={servicesSchema}
      />
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="container-editorial px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            <ScrollReveal>
              <p className="eyebrow mb-6">Services</p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h1 className="text-ink mb-8">How I can help.</h1>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-xl text-ink-light">
                I build modern interfaces, developer utilities, and web applications designed to solve real problems with speed and clarity.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding border-t border-divider">
        <div className="container-editorial px-6 md:px-12 lg:px-20">
          <div className="space-y-16 md:space-y-24">
            {services.map((service, index) => (
              <ScrollReveal key={service.number} delay={index * 50}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                  <div className="lg:col-span-4">
                    <span className="text-sm text-ink-muted tracking-wide">{service.number}</span>
                    <h2 className="font-serif text-3xl md:text-4xl text-ink mt-4">{service.title}</h2>
                  </div>
                  <div className="lg:col-span-7 lg:col-start-6">
                    <p className="text-ink-light mb-8">{service.description}</p>
                    
                    <div className="mb-8">
                      <p className="eyebrow mb-4">What's Included</p>
                      <ul className="space-y-2">
                        {service.includes.map((item, i) => (
                          <li key={i} className="text-ink-light flex items-start gap-3">
                            <span className="text-ink-muted">—</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-sm text-ink-muted mb-6">
                      <strong className="text-ink">Ideal for:</strong> {service.idealFor}
                    </p>

                    <Link 
                      to="/contact" 
                      className="arrow-link text-ink"
                    >
                      Get an Estimate for {service.title.toLowerCase()}
                      <ArrowRight size={18} strokeWidth={1.5} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-cream-dark">
        <div className="container-editorial px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <p className="eyebrow mb-4">The Process</p>
            <h2 className="text-ink mb-16 md:mb-20">How we work together.</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map((step, index) => (
              <ScrollReveal key={step.step} delay={index * 100}>
                <div className="relative">
                  <span className="text-sm text-ink-muted tracking-wide">{step.step}</span>
                  <h3 className="font-serif text-xl text-ink mt-4 mb-4">{step.title}</h3>
                  <p className="text-sm text-ink-light">{step.description}</p>
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-3 left-full w-full h-px bg-divider -translate-x-4" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding border-t border-divider">
        <div className="container-editorial px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <ScrollReveal>
                <p className="eyebrow mb-4">FAQ</p>
                <h2 className="text-ink">Common questions.</h2>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <ScrollReveal delay={100}>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-divider">
                      <AccordionTrigger className="text-left font-serif text-lg text-ink hover:no-underline py-6">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-ink-light pb-6">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-cream-darker">
        <div className="container-editorial px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-ink mb-6">Ready to build?</h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="text-ink-light mb-10 max-w-xl mx-auto">
                Whether you need an intuitive interface, a modern web app, or a practical developer utility, let's discuss what you're making.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <Button asChild>
                <Link to="/contact" className="inline-flex items-center gap-2">
                  Get in Touch
                  <ArrowRight size={18} strokeWidth={1.5} />
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
