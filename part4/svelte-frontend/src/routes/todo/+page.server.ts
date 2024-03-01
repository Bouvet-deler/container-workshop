import pgPromise from 'pg-promise';

const pgp = pgPromise({});

// We can also input the host as a variable from podman
const host = process.env['HOST'];

const db = pgp({
  // host: "localhost",
  host: host,
  port: 5432,
  database: 'todo',
  user: 'postgres',
  password: 'pass',
});

export async function load() {
  try {
    const data = (await db.any('SELECT * FROM todo ORDER BY id')) as Todo[];

    // Returns must be of type object, we can either spread the result or put it in an object
    return { data };
  } catch (error) {
    console.error('ERROR:', error);
    return { errorMsg: 'Something went wrong when fetching from database' };
  }
}

export const actions = {
  async createNewTodo({ request }) {
    const data = await request.formData();

    const todo = data.get('item');

    try {
      const data = await db.any('INSERT INTO todo(message, completed) VALUES ($1, false) RETURNING *', todo);

      return { ...data };
    } catch (error) {
      console.error('ERROR:', error);
      return { errorMsg: 'Something went wrong when inserting into database' };
    }
  },

  async toggleItemCompletionState({ request }) {
    const data = await request.formData();
    const id = data.get('id');

    try {
      const data = await db.any('UPDATE todo SET completed = NOT completed WHERE id = $1 RETURNING *', id);

      return { ...data };
    } catch (error) {
      console.error('ERROR:', error);
      return { errorMsg: 'Something went wrong when updating database' };
    }
  },
};

// TS models and types:
type PromiseType<T> = T extends Promise<infer U> ? U : T;

export type LoadReturnType = PromiseType<ReturnType<typeof load>>;

export interface Todo {
  id: number;
  message: string;
  completed: boolean;
}
