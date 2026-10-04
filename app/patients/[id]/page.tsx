import { pool } from '@/lib/db';
import { updateHistory } from '@/app/actions';

export default async function PatientDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const result = await pool.query('SELECT * FROM patients WHERE id = $1', [id]);
  const patient = result.rows[0];

  const age = patient.dob
    ? (() => {
        const today = new Date();
        const dob = new Date(patient.dob);
        let age = today.getFullYear() - dob.getFullYear();
        const birthdayNotReached =
          today.getMonth() < dob.getMonth() ||
          (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate());
        if (birthdayNotReached) age--;
        return age;
      })()
    : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white border border-zinc-200 rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-4 text-zinc-800">
          {patient.name}
          <span className="text-zinc-400 text-sm font-normal"> #{patient.id}</span>
        </h1>
        <dl className="grid grid-cols-2 gap-y-2 text-sm">
          <dt className="text-zinc-500">Phone</dt>
          <dd>{patient.phone}</dd>
          <dt className="text-zinc-500">Date of birth</dt>
          <dd>{patient.dob ? patient.dob.toLocaleDateString() : 'Not provided'}</dd>
          <dt className="text-zinc-500">Age</dt>
          <dd>{age ?? 'Not provided'}</dd>
          <dt className="text-zinc-500">Address</dt>
          <dd>{patient.address ?? 'Not provided'}</dd>
        </dl>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-3 text-zinc-800">Medical History</h2>
        <form action={updateHistory} className="flex flex-col gap-3">
          <input type="hidden" name="id" value={patient.id} />
          <textarea
            key={patient.history}
            name="history"
            rows={6}
            className="border border-zinc-300 rounded-lg px-3 py-2 text-sm"
          >
            {patient.history}
          </textarea>
          <button
            type="submit"
            className="self-start bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
          >
            Update History
          </button>
        </form>
      </div>
    </div>
  );
}