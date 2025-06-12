import { acceptAnswer } from "@/lib/actions"
import Image from "next/image"

export function Answer({ id, question_id, text, isMarked }: { id: string; question_id: string; text: string; isMarked: boolean; }) {
    return (
        <div className={`border p-4 rounded flex justify-between items-start ${ isMarked ? 'bg-green-100 border-green-400' : 'bg-white' }`}>
            <p className="flex-1 text-gray-900">{text}</p>
            {!isMarked && (
                <form action={acceptAnswer}>
                    <input type="hidden" name="questionId" value={question_id} />
                    <input type="hidden" name="answerId" value={id} />
                    <button aria-label="Mark as accepted" className="ml-4 text-2xl text-gray-400 hover:text-green-600">✔️</button>
                </form>
            )}
            {isMarked && (
                <span className="ml-4 text-2xl text-green-600" aria-label="Accepted answer">
                    ✔️
                </span>
            )}
        </div>
    );
}
