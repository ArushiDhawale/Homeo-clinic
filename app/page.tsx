import Link from "next/link";

export default function LandingPage() {
    return (
        <div>
            Dr. Mausami's Homeo Clinic
            <p>
                Welcome! Gentle, natural healing tailored just for you.<br />
                Start your journey to long-term wellness with our online consultations.
            </p>

            <Link href='/patients'>
                <button type="button">
                    Get Started
                </button></Link>
        </div>
    )
}