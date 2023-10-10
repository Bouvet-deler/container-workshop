import pgPromise from 'pg-promise';

const pgp = pgPromise({});

const db = pgp({
  host: 'localhost',
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
