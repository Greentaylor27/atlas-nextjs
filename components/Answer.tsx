import { acceptAnswer } from "@/lib/actions"
import Image from "next/image"

type AnswerItemProp = {
    id: string;
    text: string;
    questionId: string;
    isAccepted: boolean;
}

export default function Answer({ id, text, questionId, isAccepted }: AnswerItemProp) {
    return (
        <div className="flex items-center border-1 border-r border-t border-atlas-white-300"
    )
}
