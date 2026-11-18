import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Button } from "@/components/ui/button";

import portraitMain from "@/assets/portrait-main.jpg";
import workspace from "@/assets/workspace.jpg";

const values = [
  {
    number: "01",
    title: "Utility before hype",
    description: "A product should solve a real problem and make its value obvious through use, focusing on function over trend.",
  },
  {
    number: "02",
    title: "Privacy by architecture",
    description: "Prefer local execution, data minimization, and transparent handling of files so user data remains strictly on-device.",
  },
  {
    number: "03",
    title: "Accessible by default",
    description: "Make important workflows approachable for developers, students, and creators without artificial paywalls or barriers.",
  },
];

const recognition = [
  { name: "LadeStack Platform", type: "Developer Ecosystem & Hub", year: "2024" },
  { name: "GB Coder", type: "Browser-Native IDE & Sandbox", year: "2024" },
  { name: "LS PDF & MD2PDF", type: "Privacy-First Document Suite", year: "2024" },
  { name: "Open Source Utilities", type: "GitHub Tooling & Web Apps", year: "2024" },
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="container-editorial px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <p className="eyebrow mb-6">About</p>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h1 className="text-ink">
                  Designing with purpose since 2014.
                </h1>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-5">
              <ScrollReveal delay={200}>
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={portraitMain}
                    alt="Elena Vance"
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding border-t border-divider">
        <div className="container-editorial px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            <ScrollReveal>
              <p className="text-xl md:text-2xl text-ink leading-relaxed mb-8 first-letter:text-8xl md:first-letter:text-9xl first-letter:font-serif first-letter:float-left first-letter:mr-4 first-letter:mt-0 first-letter:leading-[0.75]">
                I'm Elena, a designer and brand strategist based in New York City. 
                For over a decade, I've partnered with organizations—from ambitious 
                startups to established institutions—to craft identities that resonate 
                and endure.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="text-ink-light mb-8">
                My approach is rooted in restraint and intention. I believe the most 
                powerful brands are built on clarity—a deep understanding of who you 
                are and who you serve. This understanding becomes the foundation for 
                every visual and verbal decision.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-ink-light mb-8">
                Before starting my practice, I spent five years at Pentagram and three 
                years at Collins, where I had the privilege of working with brands like 
                The Whitney Museum, Dropbox, and Spotify. These experiences shaped my 
                belief that great design emerges from rigorous thinking and deep collaboration.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p className="text-ink-light">
                When I'm not designing, you'll find me exploring the city's architecture, 
                collecting vintage typography specimens, or attempting to master the art 
                of sourdough.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-cream-dark">
        <div className="container-editorial px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <p className="eyebrow mb-16 md:mb-20">Approach</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {values.map((value, index) => (
              <ScrollReveal key={value.number} delay={index * 100}>
                <div>
                  <span className="text-sm text-ink-muted tracking-wide">{value.number}</span>
                  <h3 className="font-serif text-2xl text-ink mt-4 mb-4">{value.title}</h3>
                  <p className="text-ink-light">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="section-padding border-t border-divider">
        <div className="container-editorial px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <ScrollReveal>
                <p className="eyebrow mb-4">Recognition</p>
                <h2 className="text-ink">Awards & Press</h2>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <div className="divide-y divide-divider">
                {recognition.map((item, index) => (
                  <ScrollReveal key={item.name} delay={index * 50}>
                    <div className="py-6 flex items-center justify-between">
                      <div>
                        <h4 className="font-serif text-lg text-ink">{item.name}</h4>
                        <p className="text-sm text-ink-muted">{item.type}</p>
                      </div>
                      <span className="text-sm text-ink-muted">{item.year}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal */}
      <section className="section-padding bg-cream-dark">
        <div className="container-editorial px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <ScrollReveal>
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={workspace}
                    alt="Elena's workspace"
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <ScrollReveal delay={100}>
                <p className="eyebrow mb-4">Beyond Work</p>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-ink-light">
                  Design is a lens through which I see the world. Outside the studio, 
                  I'm drawn to architecture, typography, and the quiet details that 
                  make spaces and objects memorable. I believe creativity is fueled 
                  by curiosity—and by taking time to simply observe.
                </p>
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
              <h2 className="text-ink mb-6">
                Let's work together.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="text-ink-light mb-10 max-w-xl mx-auto">
                I'm always interested in hearing about new projects and challenges.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <Button asChild>
                <Link to="/contact" className="inline-flex items-center gap-2">
                  Get an Estimate
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
