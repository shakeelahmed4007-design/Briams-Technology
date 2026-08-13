import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function PrivacyPolicyModal({ isOpen, onClose }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-bg/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-bg border border-white/10 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col pointer-events-auto relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 sm:px-8 border-b border-white/10 relative">
                <div className="absolute top-0 left-1/4 w-[200px] h-full bg-briams-cyan/10 blur-[50px] pointer-events-none" />
                <div>
                  <span className="inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-briams-cyan mb-2 font-semibold">
                    Legal Documentation
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-text-primary">
                    CureVirtual Privacy Policy
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
                <div className="prose prose-invert prose-lg max-w-none text-text-secondary">
                  <p className="text-sm font-mono text-white/50 mb-8">
                    Last updated: August 13, 2026
                  </p>

                  <p className="text-xl text-text-primary font-medium leading-relaxed mb-8">
                    At Briams Technologies, we engineer our systems with security and privacy by design. This document outlines exactly how we handle, protect, and process data across the CureVirtual platform—with the same precision we apply to our software.
                  </p>

                  <div className="space-y-10">
                    <div>
                      <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-3">
                        <span className="text-briams-cyan">01.</span> Data We Process
                      </h3>
                      <p className="mb-4">To deliver a high-performance healthcare platform, we securely collect specific data points:</p>
                      <ul className="space-y-3 list-disc pl-6 marker:text-briams-cyan">
                        <li><strong>Identity credentials:</strong> Name, contact details, date of birth, and assigned role (Patient, Doctor, Physician Assistant, Laboratory, or Pharmacy).</li>
                        <li><strong>Clinical data:</strong> Consultation notes, prescriptions, laboratory orders and results, and symptoms provided. This constitutes highly sensitive data and is secured under rigorous safeguards (detailed in Section 04).</li>
                        <li><strong>Financial routing:</strong> Mobile money identifiers (MTN MoMo, Vodafone Cash/Telecel, AirtelTigo Money) or card data processed exclusively via our regulated payment partners. We deliberately do not store full payment credentials on our infrastructure.</li>
                        <li><strong>System analytics:</strong> Device specifications, operating systems, IPs, and app interaction metrics—collected automatically to optimize platform stability.</li>
                        <li><strong>Geolocation:</strong> Approximate coordinates, queried strictly with active user consent, to map nearby physical lab and pharmacy infrastructure.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-3">
                        <span className="text-briams-cyan">02.</span> How We Execute Operations
                      </h3>
                      <p className="mb-4">Data is utilized strictly to power the CureVirtual ecosystem:</p>
                      <ul className="space-y-2 list-disc pl-6 marker:text-briams-cyan">
                        <li>Provisioning and authenticating user accounts</li>
                        <li>Routing patients to verified doctors, clinics, labs, and pharmacies</li>
                        <li>Executing payment workflows, provider payouts, and subscriptions</li>
                        <li>Dispatching critical system notifications and appointment alerts</li>
                        <li>Enforcing platform integrity and thwarting unauthorized access</li>
                        <li>Fulfilling legal healthcare recordkeeping mandates</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-3">
                        <span className="text-briams-cyan">03.</span> Strict Data Segregation
                      </h3>
                      <p className="mb-4 text-text-primary font-medium">Your data is not our product. We do not sell personal or health information.</p>
                      <p className="mb-4">Access is strictly compartmentalized based on operational necessity:</p>
                      <ul className="space-y-4 list-disc pl-6 marker:text-briams-cyan">
                        <li><strong>Clinical personnel:</strong> Consulting practitioners have access to relevant medical history required for accurate diagnosis. Allied services (labs, pharmacies) are restricted to fulfillment data only (e.g., viewing prescriptions without modification privileges).</li>
                        <li><strong>Financial processors:</strong> Essential transactional data transmitted to complete regulated payments.</li>
                        <li><strong>Regulatory authorities:</strong> Data disclosures made exclusively when legally compelled under Ghanaian law (e.g., Health Institutions and Facilities Act, 2011).</li>
                        <li><strong>Infrastructure partners:</strong> Cloud providers bound by strict confidentiality and compliance SLAs.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-3">
                        <span className="text-briams-cyan">04.</span> Enterprise-Grade Security
                      </h3>
                      <p>
                        Clinical data is classified as maximum sensitivity. We enforce rigid Role-Based Access Controls (RBAC) across the architecture. A pharmacy cannot alter clinical directives, and laboratory telemetry is partitioned securely between the patient and ordering physician. All data payloads are encrypted at rest and in transit using industry-standard cryptography protocols.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-3">
                        <span className="text-briams-cyan">05.</span> User Autonomy & Rights
                      </h3>
                      <p className="mb-4">Governed by Ghana's Data Protection Act, 2012 (Act 843), you maintain absolute control over your digital footprint:</p>
                      <ul className="space-y-2 list-disc pl-6 marker:text-briams-cyan">
                        <li>Request comprehensive exports of your data payload</li>
                        <li>Command the modification of inaccurate records</li>
                        <li>Trigger account deletion protocols (subject to overriding medical record retention laws)</li>
                        <li>Revoke telemetry or location access instantaneously</li>
                      </ul>
                      <p className="mt-4">To execute these actions, contact our engineering support channels.</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-3">
                        <span className="text-briams-cyan">06.</span> Record Lifecycle
                      </h3>
                      <p>
                        We maintain datasets only while your instance is active, archiving historical records thereafter strictly as dictated by Ghanaian clinical and financial retention regulations.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-3">
                        <span className="text-briams-cyan">07.</span> Age Restrictions
                      </h3>
                      <p>
                        CureVirtual architecture is configured for adult operations. We actively block and purge unauthorized data belonging to minors under 18 unless authenticated by an authorized legal guardian.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-3">
                        <span className="text-briams-cyan">08.</span> Protocol Revisions
                      </h3>
                      <p>
                        Our policies evolve alongside our technology. Material changes to this protocol will be pushed to users via platform notifications. Continuous utilization of our infrastructure denotes acceptance of the latest build.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/10 bg-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm">
                  <span className="block font-bold text-text-primary mb-1">Briams Technologies Engineering</span>
                  <a href="mailto:info@briamstechnologies.com" className="text-briams-cyan hover:underline mr-4">info@briamstechnologies.com</a>
                  <span className="text-white/50">+1 720 227 3775</span>
                </div>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors border border-white/10"
                >
                  Acknowledge & Close
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
