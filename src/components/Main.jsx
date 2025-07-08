import React from "react"
import ClaudeRecipe from "./ClaudeRecipe"
import IngredientsList from "./IngredientsList";
import { marked } from 'marked'

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipeShown, setRecipeShown] = React.useState(false);
    const [recipeHtml, setRecipeHtml] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    const handleRecipeShown = async () => {
        setRecipeShown(prevRecipeShown => prevRecipeShown = true)

        if(ingredients.length < 3) return

        setLoading(prevLoading => prevLoading = true)

        try{
            const res = await fetch("http://localhost:3000/api/get-recipe", {
                method: "POST",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify({ ingredients })
            })

            const data = await res.json()
            const html = marked.parse(data.recipe || "No recipe found.")
            setRecipeHtml(prevRecipeHtml => prevRecipeHtml = html)

        } catch (err){
            console.error("API call failed:", err)
            setRecipeHtml(prevRecipeHtml => prevRecipeHtml = "<p>Something went wrong. Try again later.</p>")
        } finally {
            setLoading(prevLoading => prevLoading = false)
        }
    }

    const mapIngredients = ingredients.map((ingredient) => (
        <li key={ingredient}>{ingredient}</li>
    ))

    const addIngredient = (formData) => {
        const newIngredient = formData.get("ingredient");
        setIngredients(prevIngredients => [...prevIngredients, newIngredient.trim()])
    }

    let getRecipeContainer = ingredients.length >= 3 ? (
        <div className="get-recipe-container">
            <div>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients.</p>
            </div>
            <button className="create-recipe-btn" onClick={handleRecipeShown}>{loading ? "Thinking..." : "Get a recipe"}</button>
        </div> )
        : null;

    let ingredientsSection = ingredients.length > 0 ?
        (<IngredientsList 
            mapIngredients={mapIngredients} getRecipeContainer={getRecipeContainer}
        />)
        : null;

    let generatedRecipeContent = recipeShown && recipeHtml ? ( 
    <ClaudeRecipe recipe={recipeHtml} />)
    : null;

    return (
        <main className="main-container">
            <form className="form-addIngredient" action={addIngredient}>
                <input
                    className="form-input"
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add Ingredient"
                    name="ingredient"
                />
                <button className="form-button">Add Ingredient</button>
            </form>
            {ingredientsSection}
            {generatedRecipeContent}
        </main>
    )
}