'use server';

import { pool } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function addPatient(formData: FormData) {
  const name = formData.get('name');
  const phone = formData.get('phone');
  const address = formData.get('address');
  const dob = formData.get('dob');
  const history = formData.get('history');

  const result = await pool.query(
    'INSERT INTO patients (name, phone, address, dob, history) VALUES ($1, $2, $3, $4, $5)',
    [name, phone, address, dob, history]
);
revalidatePath('/');
}

export async function updateHistory(formData : FormData) {
  const id = formData.get('id');
  const history = formData.get('history');

  await pool.query(
    'update patients set history = $1, updated_at = now() where id = $2',
    [history, id]
  );
  revalidatePath(`/patients/${id}`);
}