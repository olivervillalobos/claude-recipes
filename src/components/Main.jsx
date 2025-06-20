export default function Main(){
    const ingredients = ["Chicken", "Oregano", "Tomatoes"]
    
    const mapIngredients = ingredients.map((ingredient) => {
        return (
            <li key={ingredient}>{ingredient}</li>
        )
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        const newIngredient = formData.get("ingredient");
        ingredients.push(newIngredient);
        console.log(ingredients);
    }

    return(
        <main className="main-container">
            <form className="form-addIngredient"onSubmit={handleSubmit}>
                <input 
                    className="form-input"
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add Ingredient"
                    name="ingredient"
                />
                <button className="form-button">Add Ingredient</button>
            </form>
            <ul>
                {mapIngredients}
            </ul>
        </main>
    )
}