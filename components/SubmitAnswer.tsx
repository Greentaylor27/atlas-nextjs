import { addAnswer } from "@/lib/actions";

export function SubmitAnswer({ id }: { id: string }) {
    return (
        <form className="relative my-8" action={addAnswer}>
            <input type="hidden" name="questionId" value={id} />
            <input type="text" name="answer" placeholder="Answer Here" className="mt-1 block w-full rounded-md border border-atlas-white-300"/>
        </form>
    )
}
