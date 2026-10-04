import { pool } from '@/lib/db'
import { addPatient } from "../actions";
import Link from "next/link";

export default async function PatientList({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const result = q
    ? await pool.query('SELECT * FROM patients WHERE name ILIKE $1', [`%${q}%`])
    : await pool.query('SELECT * FROM patients');

  return (
    <div className="flex flex-col gap-10">
      <section className="bg-white border border-zinc-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4 text-zinc-800">Add Patient</h2>
        <form action={addPatient} className="flex flex-col gap-3">
          <input
            name="name"
            type="text"
            placeholder="Name"
            required
            className="border border-zinc-300 rounded-lg px-3 py-2 text-sm"
          />
          <input
            name="phone"
            type="text"
            placeholder="Phone"
            required
            className="border border-zinc-300 rounded-lg px-3 py-2 text-sm"
          />
          <input
            name="address"
            type="text"
            placeholder="Address"
            className="border border-zinc-300 rounded-lg px-3 py-2 text-sm"
          />
          <input
            name="dob"
            type="date"
            className="border border-zinc-300 rounded-lg px-3 py-2 text-sm"
          />
          <textarea
            name="history"
            placeholder="Medical history"
            className="border border-zinc-300 rounded-lg px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="self-start bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
          >
            Add Patient
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 text-zinc-800">Patients</h2>
        <form className="flex gap-2 mb-4">
          <input
            type="text"
            name="q"
            placeholder="Search by name"
            defaultValue={q ?? ""}
            className="border border-zinc-300 rounded-lg px-3 py-2 text-sm flex-1"
          />
          <button
            type="submit"
            className="bg-zinc-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-900 transition"
          >
            Search
          </button>
        </form>

        <ul className="flex flex-col gap-2">
          {result.rows.map((patient: any) => (
            <li key={patient.id}>
              <Link
                href={`/patients/${patient.id}`}
                className="block bg-white border border-zinc-200 rounded-lg px-4 py-3 hover:border-emerald-400 transition"
              >
                <span className="font-medium">{patient.name}</span>
                <span className="text-zinc-400 text-sm"> — #{patient.id}</span>
                <span className="text-zinc-500 text-sm block">
                  {patient.dob ? patient.dob.toLocaleDateString() : 'DOB not provided'}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}