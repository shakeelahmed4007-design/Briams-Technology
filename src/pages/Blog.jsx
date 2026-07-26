import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight, User } from "lucide-react";
import { BLOG_POSTS, BLOG_CATEGORIES } from "../data/blog";
import { fadeUp, viewportOnce } from "../animations/variants";
import Button from "../components/ui/Button";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  return (
    <>
      <Helmet>
        <title>Insights & Engineering Blog — Briams Technologies</title>
        <meta
          name="description"
          content="Engineering insights, cloud architecture patterns, healthcare tech, and ERP design principles from the Briams engineering team."
        />
      </Helmet>

      {/* Hero Header */}
      <section className="pt-40 pb-16 relative bg-bg overflow-hidden border-b border-card-border">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-briams-blue/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-section relative z-10 text-center flex flex-col items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="max-w-3xl"
          >
            <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-briams-blue font-bold mb-6 bg-gradient-to-r from-briams-cyan/15 via-briams-blue/10 to-briams-orange/15 border border-briams-cyan/30 px-3.5 py-1.5 rounded-full shadow-xs">
              Briams Engineering Blog
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-text-primary">
              Insights on <span className="text-gradient-tech font-extrabold">software</span>, <span className="text-gradient-cta font-extrabold">architecture</span> & design.
            </h1>
            <p className="mt-6 text-lg text-text-secondary font-medium leading-relaxed max-w-2xl mx-auto">
              Deep dives into ERP architecture, telehealth infrastructure, cloud scale, and modern web application development.
            </p>

            {/* Search Input */}
            <div className="mt-8 max-w-md mx-auto relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface border border-card-border text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-briams-orange/30 focus:border-briams-orange transition-all duration-200"
              />
            </div>
          </motion.div>

          {/* Category Filter Pills */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {BLOG_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-briams-orange text-white shadow-md shadow-briams-orange/20"
                    : "bg-surface text-text-secondary hover:text-text-primary hover:bg-card-border/30 border border-card-border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Blog Content Section */}
      <section className="section-padding bg-bg">
        <div className="container-section">
          {/* Featured Post (shown if 'All' selected and no search) */}
          {selectedCategory === "All" && !searchQuery && featuredPost && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mb-16"
            >
              <div className="rounded-3xl bg-surface border border-card-border p-8 sm:p-12 shadow-sm hover:border-briams-blue/30 transition-all duration-300 grid lg:grid-cols-12 gap-8 items-center group">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-briams-blue/10 text-briams-blue border border-briams-blue/20">
                      Featured
                    </span>
                    <span className="text-xs text-text-muted font-medium flex items-center gap-1">
                      <Calendar size={14} />
                      {featuredPost.date}
                    </span>
                    <span className="text-xs text-text-muted font-medium flex items-center gap-1">
                      <Clock size={14} />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-text-primary group-hover:text-briams-blue transition-colors">
                    <Link to={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p className="text-text-secondary text-base leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        className="w-10 h-10 rounded-full object-cover border border-card-border"
                      />
                      <div>
                        <p className="text-sm font-semibold text-text-primary">
                          {featuredPost.author.name}
                        </p>
                        <p className="text-xs text-text-muted font-medium">
                          {featuredPost.author.role}
                        </p>
                      </div>
                    </div>

                    <Button to={`/blog/${featuredPost.slug}`} size="sm">
                      Read Article
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-5 h-64 lg:h-full min-h-[240px] rounded-2xl bg-gradient-to-br from-briams-orange/10 via-briams-gold/10 to-briams-blue/10 border border-card-border flex items-center justify-center p-6 text-center">
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-briams-orange/10 text-briams-orange flex items-center justify-center mx-auto">
                      <User size={24} />
                    </div>
                    <p className="text-xs font-mono uppercase tracking-wider text-briams-orange font-semibold">
                      {featuredPost.category}
                    </p>
                    <p className="text-sm font-semibold text-text-primary">
                      Architecture Deep Dive
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-2xl bg-surface border border-card-border p-6 shadow-sm hover:border-briams-orange/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2.5 py-1 rounded-full font-mono font-semibold bg-briams-orange/10 text-briams-orange border border-briams-orange/20">
                        {post.category}
                      </span>
                      <span className="text-text-muted flex items-center gap-1 font-medium">
                        <Clock size={13} />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-text-primary group-hover:text-briams-blue transition-colors leading-snug">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-card-border flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full object-cover border border-card-border"
                      />
                      <span className="text-xs font-semibold text-text-primary">
                        {post.author.name}
                      </span>
                    </div>

                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-xs font-semibold text-briams-blue hover:text-briams-orange flex items-center gap-1 transition-colors"
                    >
                      Read <ArrowRight size={13} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg font-semibold text-text-primary">
                No articles found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 text-sm text-briams-blue hover:underline font-semibold"
              >
                Clear search & filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
