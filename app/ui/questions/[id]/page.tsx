import { HashtagIcon } from "@heroicons/react/24/outline";
import { fetchQuestion, fetchAnswers } from "@/lib/data";
import { Answer } from "@/components/Answer";
import { SubmitAnswer } from "@/components/SubmitAnswer";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const questions = await fetchQuestion(id);
    const question = questions[0];
    const title = question ? question.title : 'Question not found';

    const answer = await fetchAnswers(id);
    const markedAnswerId = question?.answer_id;

    const sortedAnswers = [...answer].sort((a, b) => {
        if (a.id === markedAnswerId) return -1;
        if (b.id === markedAnswerId) return 1;
        return 0
    });

    return (
        <div className="w-full h-full p-4">
            <h1 className="flex items-center text-3xl mb-4">
                <HashtagIcon className="h-6 w-6 mr-2" />
                {title}
            </h1>
            <SubmitAnswer id={id} />
            <div className="space-y-2">
                {sortedAnswers.map((answer) => (
                    <Answer
                        key={answer.id}
                        id={answer.id}
                        question_id={id}
                        text={answer.answer}
                        isMarked={markedAnswerId === answer.id}
                    />
                ))}
            </div>
        </div>
    );
}
