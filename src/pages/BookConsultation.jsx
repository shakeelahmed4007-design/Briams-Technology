import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../animations/variants";
import Button from "../components/ui/Button";

import { useState } from "react";
import { createBooking, isSupabaseConfigured } from "../lib/supabase";

export default function BookConsultation() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setServerError("");
    setSuccess(false);

    if (!email) {
      setError("Please enter your email.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const payload = {
      name: name || null,
      company: company || null,
      email,
      phone: phone || null,
      message: messageBody || null,
      status: 'pending',
    };

    setLoading(true);

    try {
      const { error } = await createBooking(payload);

      if (error) {
        setServerError(error.message || 'Failed to submit request.');
        console.error('Supabase error:', error);
      } else {
        setSuccess(true);
        setName('');
        setCompany('');
        setEmail('');
        setPhone('');
        setMessageBody('');
      }
    } catch (err) {
      console.error(err);
      setServerError(err.message || 'Unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Book a Consultation — Briams Technologies</title>
        <meta
          name="description"
          content="Schedule a 30-minute discovery call to discuss your engineering needs and see if we're a good fit."
        />
      </Helmet>

      <section className="pt-40 pb-24 bg-bg min-h-screen relative overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-briams-cyan/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container-section max-w-4xl relative z-10 text-center">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-briams-cyan mb-6 font-semibold bg-briams-cyan/10 border border-briams-cyan/20 px-3 py-1.5 rounded-full"
          >
            Discovery Call
          </motion.span>
          <motion.h1
            variants={fadeUp}
            custom={0.08}
            initial="hidden"
            animate="show"
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-text-primary"
          >
            Book a 30-minute <span className="text-gradient-cta font-extrabold">consultation.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={0.16}
            initial="hidden"
            animate="show"
            className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto font-medium"
          >
            No sales pitches. Just an honest conversation about your architecture
            goals and whether our team is the right fit to build it.
          </motion.p>
        </div>

        <div className="container-section max-w-3xl mt-16 relative z-10">
          <motion.div
            variants={fadeUp}
            custom={0.24}
            initial="hidden"
            animate="show"
            viewport={viewportOnce}
            className="glass p-8 sm:p-12"
          >
            {/* Success Message Banner */}
            {success && (
              <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium text-center">
                🎉 Consultation request sent successfully! We'll contact you soon.
              </div>
            )}

            {/* Server Error Message Banner */}
            {serverError && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center">
                ⚠️ {serverError}
              </div>
            )}

            <form className="space-y-6" noValidate onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-secondary">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-glass"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-secondary">Company</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="input-glass"
                    placeholder="Acme Corp"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-secondary">Work Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    className={`input-glass ${error ? "border-briams-orange focus:border-briams-orange focus:ring-briams-orange/20" : ""}`}
                    placeholder="john@acme.com"
                  />
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-briams-orange font-medium mt-1 flex items-center gap-1.5"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                      {error}
                    </motion.p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-secondary">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-glass"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-secondary">What do you want to discuss?</label>
                <textarea
                  rows={4}
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  className="input-glass resize-none"
                  placeholder="Tell us a bit about the project or challenge..."
                />
              </div>
              <Button type="submit" size="lg" disabled={loading} className="w-full justify-center !mt-8">
                {loading ? "Submitting..." : "Request Meeting"}
              </Button>
              <p className="text-center text-xs text-text-muted font-semibold mt-4">
                We'll reach out within 24 hours to schedule a time.
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}