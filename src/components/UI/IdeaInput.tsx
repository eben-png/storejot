const IdeaInput = () => {
    return (
        <section className="flex flex-col gap-y-4 w-full items-center">
            {/* Prompt */}
            <p className="text-center text-2xl font-bold">This is a prompt.</p>

            <input type="text" name="idea" id="idea" placeholder="Start typing..." className="styled-input input-lg" />
        </section>
    )
}

export default IdeaInput;