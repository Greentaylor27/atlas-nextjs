import { sql } from "@vercel/postgres";
import { Question, Topic, User } from "./definitions";

export async function fetchUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function fetchTopics() {
  try {
    const data = await sql<Topic>`SELECT * FROM topics`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch topics.");
  }
}

export async function fetchTopic(id: string) {
  try {
    const data = await sql<Topic>`SELECT * FROM topics WHERE id = ${id}`;
    return data.rows && data.rows.length > 0 ? data.rows[0] : null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch topics.");
  }
}

export async function fetchQuestions(id: string) {
  try {
    const data =
      await sql<Question>`SELECT * FROM questions WHERE topic_id = ${id} ORDER BY votes DESC`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch questions.");
  }
}

export async function insertQuestion(
  question: Pick<Question, "title" | "topic_id" | "votes">
) {
  try {
    const data =
      await sql<Question>`INSERT INTO questions (title, topic_id, votes) VALUES (${question.title}, ${question.topic_id}, ${question.votes})`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add question.");
  }
}

export async function insertTopic(topic: Pick<Topic, "title">) {
  try {
    const data =
      await sql<Topic>`INSERT INTO topics (title) VALUES (${topic.title}) RETURNING id;`;
    console.log(data.rows[0]);
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add topic.");
  }
}

export async function incrementVotes(id: string) {
  try {
    const data =
      await sql<Question>`UPDATE questions SET votes = votes + 1 WHERE id = ${id}`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to increment votes.");
  }
}

export async function fetchQuestion(id: string) {
  try {
    const data = await sql`SELECT * FROM questions WHERE id = ${id}`;
    return data.rows[0];
  } catch (err) {
    console.error("Failed to fetch question:", err);
    throw new Error("Failed to fetch question.")
  }
}

export async function fetchAnswers(questionId: string) {
  try {
    const result = await sql`SELECT * FROM answers WHERE question_id = ${questionId}`;
    return result.rows;
  } catch (err) {
    console.error("Error Fetching Answer:", err);
    throw new Error("Error fetching answer");
  }
}

export async function insertAnswer(questionId: string, answer: string) {
  try {
    await sql`
    INSERT INTO answers (answer, question_id)
    VALUES (${answer}, ${questionId});
    `;
  } catch (err) {
    console.error("Error inserting answer into Database:", err);
    throw new Error("Failed to insert question Try again");
  }
}

export async function answerMarkedAsAccepted(questionId: string, answerId: string) {
  try {
    await sql`
    UPDATE questions
    SET answer_id = ${answerId}
    WHERE id = ${questionId};
    `;
  } catch (err) {
    console.error("Failed Accepting Answer:", err);
    throw new Error("Failed to Accept Answer.");
  }
}
