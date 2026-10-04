import Image from "next/image";

//async component
//import db connection
import { pool } from '@/lib/db'
import { addPatient } from "./actions";
export default async function PatientList() {
  const result = await pool.query('SELECT * FROM patients');


  return (
    <div>
      <form action={addPatient}>
        <label>
          <input name = "name" type = "text" required/>
        </label>
        <label>
          <input name = "phone" type = "text" required/>
        </label>
        <label>
          <input name = "address" type = "text" />
        </label>
        <label>
          <input name = "dob" type = "date" />
        </label>
        <label>
          <textarea name="history"></textarea>
        </label>
        <button type="submit">Add Patient</button>
      </form>
      <h2>Patient list</h2>
      <ul>
        {result.rows.map((patient: any) => (
          <li key={patient.id}>
            {patient.id} | {patient.name} - {patient.dob ? patient.dob.toLocaleDateString() : 'Not provided'}
          </li>
        ))}
      </ul>
    </div>
  )
}

