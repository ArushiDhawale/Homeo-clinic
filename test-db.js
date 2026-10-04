require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  await client.connect();
  console.log('Connected!');

  const result = await client.query('select * from patients;'); // your turn — same SELECT you ran in Neon

  console.log(result.rows);
  await client.end();
}

main();