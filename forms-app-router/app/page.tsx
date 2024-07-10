import { open } from 'sqlite'
import sqlite3 from 'sqlite3';
import { AddForm } from "@/app/add-form";
import { DeleteForm } from "@/app/delete-form";

export default async function Home() {
  const db = await open({
    filename: './db.sqlite3',
    driver: sqlite3.Database,
  })
  let todos = await db.all<{ id: number, text: string }[]>(`SELECT * FROM todos`);
  await db.close()

  return (
    <main>
      <h1 className="sr-only">Todos</h1>
      <AddForm />
      <ul>
        {todos && todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <DeleteForm id={todo.id} todo={todo.text} />
          </li>
        ))}
      </ul>
    </main>
  );
}
