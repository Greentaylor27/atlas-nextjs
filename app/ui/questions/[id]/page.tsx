import { fetchQuestions, fetchAnswer } from "@/lib/data";

export default async function Page({ params: { id } }) {
  const question = await fetchQuestions(id);
  const answers = await fetchAnswer(id);

  if (!question) {
    return <div>Question not found</div>;
  }

  return (
    <div>
      <h1>{question.title}</h1>
    </div>
  )
}
