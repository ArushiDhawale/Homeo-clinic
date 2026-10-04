import { updateHistory } from '@/app/actions';
import { pool } from '@/lib/db';

export default async function PatientDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const result = await pool.query('SELECT * FROM patients WHERE id = $1', [id]);
    const patient = result.rows[0];

    return (
        <div>
            Patient Details
            Patient ID - {patient.id}
            Name - {patient.name}
            Phone - {patient.phone}
            DOB - {patient.dob ? patient.dob.toLocaleDateString() : 'Not provided'}
            Age - {patient.dob
                ? (() => {
                    const today = new Date();
                    const dob = new Date(patient.dob);
                    let age = today.getFullYear() - dob.getFullYear();

                    const birthdayNotReached =
                        today.getMonth() < dob.getMonth() ||
                        (today.getMonth() === dob.getMonth() &&
                            today.getDate() < dob.getDate());

                    if (birthdayNotReached) age--;

                    return age;
                })()
                : "Not provided"}
            Address - {patient.address ? patient.address : 'Not provided'}
            History - {patient.history ? patient.history : 'Not provided'}

            <form action={updateHistory}>
                <input type="hidden" name="id" value={patient.id} />
                <textarea
                    key={patient.history}
                    name="history"
                    className="border p-2 w-full"
                >
                    {patient.history}
                </textarea>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update history</button>
            </form>
        </div>
    );
}