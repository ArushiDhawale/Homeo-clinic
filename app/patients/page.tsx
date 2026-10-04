import Image from "next/image";

import { pool } from '@/lib/db'
import { addPatient } from "../actions";
import Link from "next/link";
import { link } from "fs";

export default async function PatientList({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const result = q
    ? await pool.query('SELECT * FROM patients WHERE name ILIKE $1', [`%${q}%`])
    : await pool.query('SELECT * FROM patients');

  return (
    <div>
      <form action={addPatient}>
        <label>
          <input name="name" type="text" required />
        </label>
        <label>
          <input name="phone" type="text" required />
        </label>
        <label>
          <input name="address" type="text" />
        </label>
        <label>
          <input name="dob" type="date" />
        </label>
        <label>
          <textarea name="history"></textarea>
        </label>
        <button type="submit">Add Patient</button>
      </form>
      <h2>Patient list</h2>
      <form>
        <input type="text" name="q" placeholder="Search by name" />
        <button type="submit">Search</button>
      </form>
      <ul>
        {result.rows.map((patient: any) => (
          <Link href={`/patients/${patient.id}`}>
            <li key={patient.id}>
              {patient.id} | {patient.name} - {patient.dob ? patient.dob.toLocaleDateString() : 'Not provided'}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}