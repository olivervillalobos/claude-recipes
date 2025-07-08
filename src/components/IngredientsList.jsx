export default function IngredientsList(props){
    return(
        <section className="ingredients-recipe-section">
            <h2 className="ingredients-header">Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">
                {props.mapIngredients}
            </ul>
            {props.getRecipeContainer}
        </section>
    )
}