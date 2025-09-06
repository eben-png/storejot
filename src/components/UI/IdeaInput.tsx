import { useState } from "react";

const IdeaInput = () => {
    const [limit, setLimit] = useState(10);
    const [ideaValue, setIdeaValue] = useState("");
    const [ideas, setIdeas] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!ideaValue.trim()) return;

        setIdeas(prev => [...prev, ideaValue.trim()]);
        setIdeaValue("");
    };

    const handleIdeaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIdeaValue(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 w-full items-center">
            <p className="text-center text-2xl font-bold">This is a prompt.</p>

            <input
                type="text"
                name="idea"
                id="idea"
                placeholder="Start typing..."
                value={ideaValue}
                className="styled-input input-lg"
                onChange={handleIdeaChange}
            />

            <button type="submit" className="sr-only">Submit</button>

            <section className="text-xl flex gap-x-5 mt-5 opacity-50">
                <span onClick={() => {
                    if (limit - 1 >= ideas.length) {
                        setLimit(limit - 1)
                    }

                }} className="cursor-pointer select-none">-</span>
                <section className={`mx-4 flex gap-x-1 transition-colors duration-500 ${ideas.length === limit ? "text-green-500" : ""}`}>
                    <span className="opacity-50">{ideas.length}</span>
                    <span>/</span>
                    <span>{limit}</span>
                </section>
                <span onClick={() => setLimit(limit + 1)} className="cursor-pointer select-none">+</span>
            </section>
        </form>
    );
};

export default IdeaInput;
