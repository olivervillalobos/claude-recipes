export default function Main(){
    return(
        <main className="main-container">
            <form className="form-addIngredient">
                <input 
                    className="form-input"
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add Ingredient"
                />
                <button className="form-button">Add Ingredient</button>
            </form>
        </main>
    )
}