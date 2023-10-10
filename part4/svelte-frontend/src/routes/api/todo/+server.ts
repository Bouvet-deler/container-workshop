import pgPromise from 'pg-promise';

const pgp = pgPromise({});

// We can also input the host as a variable from podman
const host = process.env["HOST"]

const db = pgp({
  // host: "localhost",
  host: host,
  port: 5432,
  database: 'todo',
  user: 'postgres',
  password: 'pass',
});

export const GET = async () => {
  try {
    const data = await db.any('SELECT * FROM todo');
    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error('ERROR:', error);
    return { status: 500, body: { error: 'Database query failed' } };
  }
};
