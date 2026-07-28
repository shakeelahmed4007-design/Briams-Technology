import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { TESTIMONIALS } from "../../data/content";
import SectionTitle from "../ui/SectionTitle";
import GlassCard from "../ui/GlassCard";
import "swiper/css";
import "swiper/css/pagination";

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-surface border-b border-card-border">
      <div className="container-section">
        <SectionTitle
          eyebrow="Testimonials"
          title="What technical leaders say"
        />

        <div className="mt-16 relative">
          {/* Custom pagination styles for the light theme are in global css or rely on Tailwind */}
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={32}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-16"
          >
            {TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.id} className="h-auto">
                <GlassCard className="p-8 h-full flex flex-col justify-between group">
                  <p className="text-[15px] font-medium text-text-secondary leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-8 pt-6 border-t border-card-border flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-briams-orange/20 via-briams-gold/20 to-briams-blue/20 flex items-center justify-center font-display font-extrabold text-briams-orange text-lg border border-briams-orange/30 shadow-xs">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-text-primary text-sm group-hover:text-briams-blue transition-colors">{t.name}</p>
                      <p className="text-xs font-mono uppercase tracking-wider text-briams-blue mt-0.5 font-bold">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
