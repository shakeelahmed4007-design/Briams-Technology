import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp, viewportOnce } from "../animations/variants";
import { Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "../constants/nav";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import { createMessage, isSupabaseConfigured } from "../lib/supabase";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact — Briams Technologies</title>
        <meta
          name="description"
          content="Get in touch with Briams Technologies for enterprise software solutions, ERPs, and IT consultancy."
        />
      </Helmet>

      <section className="pt-40 pb-20 bg-bg overflow-hidden relative">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-briams-orange/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="container-section relative z-10 text-center">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-briams-cyan mb-6 font-semibold bg-briams-cyan/10 border border-briams-cyan/20 px-3 py-1.5 rounded-full"
          >
            Contact
          </motion.span>
          <motion.h1
            variants={fadeUp}
            custom={0.08}
            initial="hidden"
            animate="show"
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-text-primary"
          >
            Let's discuss <span className="text-gradient-cta font-extrabold">your next project.</span>
          </motion.h1>
        </div>
      </section>

      <section className="pb-32 bg-bg relative z-10">
        <div className="container-section">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              <h2 className="text-3xl font-bold text-text-primary mb-6">
                Send a message
              </h2>
              <ContactForm />
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={0.2}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="lg:pt-14"
            >
              <GlassCard className="p-8 sm:p-10">
                <h3 className="text-xl font-bold text-text-primary mb-8">
                  Direct contact
                </h3>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface border border-card-border flex items-center justify-center shrink-0 shadow-xs">
                      <Mail size={20} className="text-briams-orange" />
                    </div>
                    <div>
                      <p className="font-bold text-text-primary">Email</p>
                      <a href={`mailto:${SITE.email}`} className="text-briams-orange font-semibold hover:underline mt-1 block">
                        {SITE.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface border border-card-border flex items-center justify-center shrink-0 shadow-xs">
                      <Phone size={20} className="text-briams-blue" />
                    </div>
                    <div>
                      <p className="font-bold text-text-primary">Phone</p>
                      <a href={`tel:${SITE.phone}`} className="text-briams-blue font-semibold hover:underline mt-1 block">
                        {SITE.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface border border-card-border flex items-center justify-center shrink-0 shadow-xs">
                      <MapPin size={20} className="text-briams-cyan" />
                    </div>
                    <div>
                      <p className="font-bold text-text-primary">Office</p>
                      <p className="text-text-secondary font-medium mt-1 max-w-[200px] leading-relaxed">
                        {SITE.address}
                      </p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setServerError("");
    setSuccess(false);

    if (!email || !message) {
      setError("Please enter your email and message.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      if (isSupabaseConfigured) {
        const { error } = await createMessage({
          first_name: firstName || null,
          last_name: lastName || null,
          email,
          message,
          created_at: new Date().toISOString(),
        });
        if (error) {
          setServerError(error.message || 'Failed to send message.');
          console.error('Supabase insert error:', error);
        } else {
          setSuccess(true);
          setFirstName("");
          setLastName("");
          setEmail("");
          setMessage("");
        }
      } else {
        const pending = JSON.parse(localStorage.getItem('pendingMessages') || '[]');
        pending.push({
          first_name: firstName || null,
          last_name: lastName || null,
          email,
          message,
          created_at: new Date().toISOString(),
        });
        localStorage.setItem('pendingMessages', JSON.stringify(pending));
        setSuccess(true);
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
        console.warn('Supabase not configured — saved message locally.');
      }
    } catch (err) {
      console.error(err);
      setServerError(err.message || 'Unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit}>
      {success && (
        <div className="mb-4 rounded-xl border border-green-400/20 bg-green-500/10 p-4 text-sm text-green-700">
          Your message has been sent successfully.
        </div>
      )}
      {serverError && (
        <div className="mb-4 rounded-xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-700">
          {serverError}
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-text-secondary">First name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input-glass"
            placeholder="John"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-text-secondary">Last name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input-glass"
            placeholder="Doe"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-text-secondary">Email address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-glass"
          placeholder="john@company.com"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-text-secondary">Message</label>
        <textarea
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input-glass resize-none"
          placeholder="Tell us about your project..."
        />
      </div>
      {error && (
        <p className="text-sm text-briams-orange font-medium">{error}</p>
      )}
      <Button type="submit" size="lg" className="w-full justify-center mt-2" disabled={loading}>
        {loading ? 'Sending...' : 'Send message'}
      </Button>
    </form>
  );
}
