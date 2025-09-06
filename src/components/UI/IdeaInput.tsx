import { useEffect, useState } from "react";
import { themes, prompts } from "../../assets/prompts/prompt.json";

const IdeaInput = () => {
  const [limit, setLimit] = useState(10);
  const [ideaValue, setIdeaValue] = useState("");
  const [ideas, setIdeas] = useState<string[]>([]);
  const [theme, setTheme] = useState("");
  const [prompt, setPrompt] = useState("");

  // Initialize theme
  useEffect(() => {
    const today = new Date();
    const seed =
      today.getFullYear() * 10000 +
      (today.getMonth() + 1) * 100 +
      today.getDate();
    const x = Math.sin(seed) * 10000;
    const randomIndex = Math.floor((x - Math.floor(x)) * themes.length);
    setTheme(themes[randomIndex]);

    // Set prompt
    const verb =
      prompts.verbs[Math.floor(Math.random() * prompts.verbs.length)];
    const noun =
      prompts.nouns[Math.floor(Math.random() * prompts.nouns.length)];
    const subject =
      prompts.subjects[Math.floor(Math.random() * prompts.subjects.length)];
    const constraint =
      prompts.constraints[
        Math.floor(Math.random() * prompts.constraints.length)
      ];
    const twist =
      prompts.twists[Math.floor(Math.random() * prompts.twists.length)];

    setPrompt(
      `${verb[0].toUpperCase()}${verb.slice(
        1,
        verb.length
      )} ${noun} ${subject}, ${constraint}, ${twist}`
    );
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!ideaValue.trim()) return;

    setIdeas((prev) => [...prev, ideaValue.trim()]);
    setIdeaValue("");
  };

  const handleIdeaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdeaValue(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-4 w-full items-center"
    >
      <span>{theme}</span>
      <p className="text-center text-lg font-bold">{prompt}</p>

      <input
        type="text"
        name="idea"
        id="idea"
        placeholder="Start typing..."
        value={ideaValue}
        className="styled-input input-lg"
        onChange={handleIdeaChange}
      />

      <button type="submit" className="sr-only">
        Submit
      </button>

      <section className="text-xl flex gap-x-5 mt-5 opacity-50">
        <span
          onClick={() => {
            if (limit - 1 >= ideas.length) {
              setLimit(limit - 1);
            }
          }}
          className="cursor-pointer select-none"
        >
          -
        </span>
        <section
          className={`mx-4 flex gap-x-1 transition-colors duration-500 ${
            ideas.length >= limit ? "text-green-500" : ""
          }`}
        >
          <span className="opacity-50">{ideas.length}</span>
          <span>/</span>
          <span>{limit}</span>
        </section>
        <span
          onClick={() => setLimit(limit + 1)}
          className="cursor-pointer select-none"
        >
          +
        </span>
      </section>
    </form>
  );
};

export default IdeaInput;
