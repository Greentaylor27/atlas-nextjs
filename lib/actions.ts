"use server";

import { revalidatePath } from "next/cache";
import { incrementVotes, insertQuestion, insertTopic, insertAnswer, answerMarkedAsAccepted } from "./data";
import { redirect } from "next/navigation";

export async function addTopic(data: FormData) {
    let topic;
    try {
        topic = await insertTopic({
            title: data.get("title") as string,
        });
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to add topic.");
    } finally {
        revalidatePath("/ui/topic/[id]", "page");
        topic && redirect(`/ui/topics/${topic.id}`);
    }
}

export async function addQuestion(question: FormData) {
    try {
        insertQuestion({
            title: question.get("title") as string,
            topic_id: question.get("topic_id") as string,
            votes: 0,
        });
        revalidatePath("/ui/topics/[id]", "page");
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to add question.");
    }
}

export async function addVote(data: FormData) {
    try {
        incrementVotes(data.get("id") as string);
        revalidatePath("/ui/topics/[id]", "page");
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to add vote.");
    }
}

export async function addAnswer(data: FormData) {
    try {
        const questionId = data.get("questionId") as string;
        const answer = data.get("answer") as string;

        if (!questionId || !answer) return;

        await insertAnswer(questionId, answer);
        revalidatePath(`/ui/questions/${questionId}`);
    } catch (err) {
        console.error("Failed to to add Answer:", err);
        throw new Error("Failed to add Answer");
    }
}

export async function acceptAnswer(data: FormData) {
    try {
        const questionId = data.get("questionId") as string;
        const answerId = data.get("answerId") as string;

        if (!questionId || !answerId) return;

        await answerMarkedAsAccepted(questionId, answerId);
        revalidatePath(`/ui/questions/${questionId}`);
    } catch (err) {
        console.error("Failed to mark answer:", err);
        throw new Error("failed to mark answer.");
    }
}
