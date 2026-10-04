import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center text-center gap-6 py-16">
      <h1 className="text-3xl font-semibold text-emerald-800">
        Dr. Mausami's Homeo Clinic
      </h1>
      <p className="text-zinc-600 max-w-md">
        Welcome! Gentle, natural healing tailored just for you. Start your
        journey to long-term wellness with our online consultations.
      </p>
      <Link href="/patients">
        <button
          type="button"
          className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition"
        >
          Get Started
        </button>
      </Link>
    </div>
  );
}