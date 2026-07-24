import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { BLOG_POSTS } from "../data/blog";
import { fadeUp } from "../animations/variants";
import Button from "../components/ui/Button";

export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug) || BLOG_POSTS[0];

  return (
    <>
      <Helmet>
        <title>{post.title} — Briams Technologies Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <section className="pt-40 pb-20 bg-bg min-h-screen">
        <div className="container-section max-w-4xl">
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-briams-blue mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to all articles
          </Link>

          {/* Article Header */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-briams-blue/10 text-briams-blue border border-briams-blue/20">
                {post.category}
              </span>
              <span className="text-xs text-text-muted font-medium flex items-center gap-1">
                <Calendar size={14} />
                {post.date}
              </span>
              <span className="text-xs text-text-muted font-medium flex items-center gap-1">
                <Clock size={14} />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-text-primary leading-tight">
              {post.title}
            </h1>

            <p className="text-lg text-text-secondary font-medium leading-relaxed border-l-4 border-briams-orange pl-4 italic">
              {post.excerpt}
            </p>

            {/* Author bar */}
            <div className="pt-4 border-t border-b border-card-border py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover border border-card-border"
                />
                <div>
                  <p className="text-base font-semibold text-text-primary">
                    {post.author.name}
                  </p>
                  <p className="text-xs text-text-muted font-medium">
                    {post.author.role}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Article link copied to clipboard!");
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-card-border text-xs font-semibold text-text-secondary hover:text-text-primary hover:border-briams-blue/30 transition-all"
              >
                <Share2 size={14} />
                Share
              </button>
            </div>
          </motion.div>

          {/* Article Body */}
          <div className="mt-12 text-text-secondary text-base leading-relaxed space-y-6">
            <p>
              When building modern enterprise platforms, architecture choices set the foundation for technical longevity and operational speed. In this post, we detail our empirical findings and design frameworks.
            </p>

            <h3 className="text-2xl font-bold text-text-primary pt-4">
              1. Modular Isolation and Boundaries
            </h3>
            <p>
              Establishing clean domain boundaries allows discrete teams to deploy features without risking global platform downtime. By establishing explicit interfaces and data contracts, frontend and backend services evolve independently.
            </p>

            <div className="p-6 rounded-2xl bg-surface border border-card-border my-6">
              <p className="font-mono text-sm text-briams-blue font-semibold mb-2">
                // System Principle
              </p>
              <p className="text-text-primary font-medium">
                "Keep shared state localized at root provider level; decouple UI modules through strict props and domain events."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-text-primary pt-4">
              2. Verification and Operational Resilience
            </h3>
            <p>
              High availability is achieved through automated end-to-end testing, zero-downtime database migrations, and predictive monitoring. Continuous health checks ensure zero disruption to live user sessions.
            </p>

            {/* CTA Box */}
            <div className="mt-12 p-8 rounded-3xl bg-surface border border-card-border text-center space-y-4">
              <h4 className="text-2xl font-bold text-text-primary">
                Ready to transform your enterprise architecture?
              </h4>
              <p className="text-text-secondary text-sm max-w-lg mx-auto font-medium">
                Book a 30-minute consultation with our engineering team to review your tech stack and scalability roadmap.
              </p>
              <div className="pt-2">
                <Button to="/book-consultation" size="lg">
                  Book Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
