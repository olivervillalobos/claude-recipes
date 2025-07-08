export default function ClaudeRecipe(props) {
    return (
        <section className="generated-recipe">
            <h2>Chef Claude Recommends:</h2>
            <article
                className="suggested-recipe-container"
                aria-live="polite"
                dangerouslySetInnerHTML={{ __html: props.recipe }}
            />
        </section>
    )
}
