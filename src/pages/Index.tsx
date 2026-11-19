import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { HorizontalScrollGallery } from "@/components/shared/HorizontalScrollGallery";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";

import northlightHero from "@/assets/projects/northlight-hero.jpg";
import meridianHero from "@/assets/projects/meridian-hero.jpg";
import emberHero from "@/assets/projects/ember-hero.jpg";
import stillwaterHero from "@/assets/projects/stillwater-hero.jpg";
import bharatLandHero from "@/assets/projects/bharat-land-hero.jpg";
import swiftResumeHero from "@/assets/projects/swift-resume-hero.jpg";
import lsImageCompressorHero from "@/assets/projects/ls-image-compressor-hero.jpg";
import gamehubHero from "@/assets/projects/gamehub-hero.jpg";
import portraitMain from "@/assets/portrait-main.jpg";

const projectImages: Record<string, string> = {
  "ladestack": northlightHero,
  "gb-coder": meridianHero,
  "ls-pdf": emberHero,
  "md2pdf": stillwaterHero,
  "bharat-land-converter": bharatLandHero,
  "swift-resume": swiftResumeHero,
  "ls-image-compressor": lsImageCompressorHero,
  "gamehub": gamehubHero,
};

const services = [
  {
    title: "UI/UX & Product Design",
    description: "Intuitive, accessible, and responsive visual systems built with purpose.",
  },
  {
    title: "Frontend Engineering",
    description: "High-performance interfaces using modern TypeScript, React, and Astro.",
  },
  {
    title: "Developer Tools",
    description: "Browser-first utilities and privacy-conscious software architecture.",
  },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-dvh flex items-center pt-24 md:pt-32">
        <div className="container-editorial px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Text Content */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <ScrollReveal>
                <p className="eyebrow mb-6">UI/UX Designer · Full-Stack Developer</p>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h1 className="text-ink mb-8">
                  Building useful software with thoughtful design.
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-lg md:text-xl text-ink-light max-w-xl mb-10">
                  I'm Girish, an independent developer and product designer building LadeStack—a growing ecosystem of accessible, privacy-conscious developer tools and practical web apps.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <Link
                  to="/work"
                  className="arrow-link text-ink"
                >
                  View Selected Projects
                  <ArrowRight size={18} strokeWidth={1.5} />
                </Link>
              </ScrollReveal>
            </div>

            {/* Image */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <ScrollReveal delay={200}>
                <div className="aspect-[4/5] bg-cream-darker overflow-hidden">
                  <img
                    src={portraitMain}
                    alt="Girish Lade - Designer & Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Scroll Indicator */}
          <ScrollReveal delay={500} className="hidden lg:block mt-24">
            <div className="flex items-center gap-3 text-ink-muted">
              <div className="w-px h-12 bg-divider origin-top animate-line-grow" />
              <ArrowDown size={16} strokeWidth={1.5} className="animate-bounce" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Horizontal Scroll Gallery */}
      <HorizontalScrollGallery />

      {/* Selected Work Section */}
      <section className="section-padding bg-cream-dark">
        <div className="container-editorial">
          <ScrollReveal>
            <SectionHeader
              eyebrow="Selected Work"
              title="Projects"
              className="mb-16 md:mb-20"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {projects.slice(0, 4).map((project, index) => (
              <ScrollReveal key={project.slug} delay={index * 100}>
                <ProjectCard
                  slug={project.slug}
                  title={project.title}
                  category={project.category}
                  year={project.year}
                  image={projectImages[project.slug]}
                  aspectRatio={index % 3 === 0 ? "portrait" : "landscape"}
                />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-16 md:mt-20">
            <Link to="/work" className="arrow-link text-ink">
              View All Projects
              <ArrowRight size={18} strokeWidth={1.5} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section-padding">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <div className="lg:col-span-6">
              <ScrollReveal>
                <p className="eyebrow mb-6">About</p>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <blockquote className="font-serif text-3xl md:text-4xl text-ink leading-snug mb-8">
                  "Engineer by training. Product builder by choice."
                </blockquote>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-ink-light mb-8">
                  I combine an engineering foundation with modern web development and interaction design. 
                  My focus with LadeStack is to build focused, privacy-conscious tools that remove 
                  unnecessary friction from coding, document workflows, and everyday digital productivity.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <Link to="/about" className="arrow-link text-ink">
                  Learn more about my approach
                  <ArrowRight size={18} strokeWidth={1.5} />
                </Link>
              </ScrollReveal>
            </div>

            {/* Image */}
            <div className="lg:col-span-5 lg:col-start-8">
              <ScrollReveal delay={200}>
                <div className="aspect-[4/5] bg-cream-darker overflow-hidden">
                  <img
                    src={portraitMain}
                    alt="Girish Lade portrait"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-cream-dark">
        <div className="container-editorial">
          <ScrollReveal>
            <SectionHeader
              eyebrow="Services"
              title="What I Do"
              className="mb-16 md:mb-20"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {services.map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 100}>
                <div className="border-t border-divider pt-8">
                  <h3 className="font-serif text-2xl text-ink mb-4">{service.title}</h3>
                  <p className="text-ink-light">{service.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-16 md:mt-20">
            <Link to="/services" className="arrow-link text-ink">
              View All Services
              <ArrowRight size={18} strokeWidth={1.5} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-cream-darker">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-ink mb-6">
                Let's build something{" "}
                <em className="font-serif italic">useful.</em>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="text-ink-light mb-10 max-w-xl mx-auto">
                Have an interesting project, collaboration idea, or technical question? 
                I'm always interested in connecting with people building better digital tools.
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
