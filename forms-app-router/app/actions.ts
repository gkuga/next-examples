"use server";

import { open } from 'sqlite'
import sqlite3 from 'sqlite3';
import { revalidatePath } from "next/cache";
import { z } from "zod";


export async function createTodo(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const schema = z.object({
    todo: z.string().min(1),
  });
  const parse = schema.safeParse({
    todo: formData.get("todo"),
  });

  if (!parse.success) {
    return { message: "Failed to create todo" };
  }

  const data = parse.data;
  const db = await open({
    filename: './db.sqlite3',
    driver: sqlite3.Database,
  });
  console.log(data.todo)
  try {
    await db.run(`
      INSERT INTO todos (text)
      VALUES ("${data.todo}")
    `);

    revalidatePath("/");
    return { message: `Added todo ${data.todo}` };
  } catch (e) {
    return { message: "Failed to create todo" };
  }
}

export async function deleteTodo(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const schema = z.object({
    id: z.string().min(1),
    todo: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get("id"),
    todo: formData.get("todo"),
  });
  try {
    const db = await open({
      filename: './db.sqlite3',
      driver: sqlite3.Database,
    });
    await db.run(`
      DELETE FROM todos
      WHERE id = ${data.id};
    `);

    revalidatePath("/");
    return { message: `Deleted todo ${data.todo}` };
  } catch (e) {
    return { message: "Failed to delete todo" };
  }
}
