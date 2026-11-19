import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { SEO } from "@/components/shared/SEO";
import { SITE_CONFIG, createBreadcrumbSchema } from "@/lib/seo-config";
import { projects } from "@/data/projects";

import northlightHero from "@/assets/projects/northlight-hero.jpg";
import meridianHero from "@/assets/projects/meridian-hero.jpg";
import emberHero from "@/assets/projects/ember-hero.jpg";
import stillwaterHero from "@/assets/projects/stillwater-hero.jpg";
import bharatLandHero from "@/assets/projects/bharat-land-hero.jpg";
import swiftResumeHero from "@/assets/projects/swift-resume-hero.jpg";
import lsImageCompressorHero from "@/assets/projects/ls-image-compressor-hero.jpg";
import gamehubHero from "@/assets/projects/gamehub-hero.jpg";

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

export default function Work() {
  const workSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_CONFIG.siteUrl}/work#webpage`,
        "url": `${SITE_CONFIG.siteUrl}/work`,
        "name": `Work & Selected Projects | ${SITE_CONFIG.name}`,
        "description": "Featured developer tools, browser IDEs, document utilities, and web applications built by Girish Lade.",
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": projects.map((p, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": p.title,
            "url": `${SITE_CONFIG.siteUrl}/work/${p.slug}`,
            "description": p.overview,
          })),
        },
      },
      createBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Work", url: "/work" },
      ]),
    ],
  };

  return (
    <Layout>
      <SEO
        title="Work & Portfolio | Selected Projects & Developer Tools"
        description="Explore case studies and featured products created by Girish Lade: LadeStack, GB Coder, LS PDF, MD2PDF, Swift Resume, and privacy-conscious web utilities."
        canonical="/work"
        schema={workSchema}
      />
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="container-editorial px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <p className="eyebrow mb-6">Portfolio</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-ink max-w-4xl">Selected Projects &amp; Tools</h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding border-t border-divider">
        <div className="container-editorial px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-x-12 md:gap-y-24 lg:gap-x-16">
            {projects.map((project, index) => (
              <ScrollReveal 
                key={project.slug} 
                delay={index * 100}
                className={index % 3 === 1 ? "md:mt-24" : ""}
              >
                <ProjectCard
                  slug={project.slug}
                  title={project.title}
                  category={project.category}
                  year={project.year}
                  image={projectImages[project.slug]}
                  aspectRatio={index % 2 === 0 ? "landscape" : "portrait"}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-cream-dark">
        <div className="container-editorial px-6 md:px-12 lg:px-20">
          <div className="max-w-2xl">
            <ScrollReveal>
              <p className="eyebrow mb-4">Have something in mind?</p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-ink mb-6">
                Let's discuss your project.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-ink-light">
                I'm always open to discussing developer experience, web apps, thoughtful UI/UX, or practical software ideas.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
