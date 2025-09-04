// src/features/filters/components/HeroSection.tsx

import FilterForm from "@/features/filters/FilterForm";
import heroImg from "/images/hero-batch.jpg"; 

export default function HeroSection() {
  return (
    <section className="bg-[#B3B38E] rounded-3xl p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-8">
      {/* Colonne gauche avec texte et formulaire */}
      <div className="flex-1 text-black max-w-xl space-y-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Libérez votre semaine !
          </h1>
          <p className="mt-4 text-lg text-black">
            Savourez chaque instant : votre batch cooking simplifié, pour une vie plus douce.
          </p>
        </div>

        <div className="space-y-3">
          <FilterForm />
        </div>
      </div>

      {/* Colonne droite avec image */}
      <div className="flex-1">
        <img
          src={heroImg}
          alt="Repas batch"
          className="rounded-2xl w-full object-cover shadow-lg"
        />
      </div>
    </section>
  );
}
