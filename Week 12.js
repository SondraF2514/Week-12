document.getElementById("fetch-recipes").addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent form submission

    const response = await fetch('http://localhost:3000/recipes'); // Replace with your API endpoint
    const recipes = await response.json();

    const container = document.getElementById("recipes-container");
    container.innerHTML = ""; // Clear previous content

    recipes.forEach(recipe => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe-card", "mb-3", "p-3", "border");
        recipeDiv.innerHTML = `<h4>${recipe.name}</h4><p>${recipe.description}</p>`;
        container.appendChild(recipeDiv);
    });
});

$(document).ready(function() {
    const apiURL = "http://localhost:3000/recipes";

    // **CREATE** Recipe
    $("#recipe-form").submit(async function(event) {
        event.preventDefault();
        let newRecipe = {
            name: $("#recipe-name").val(),
            ingredients: $("#recipe-ingredients").val()
        };

        const response = await fetch(apiURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newRecipe)
        });

        if (response.ok) {
            $("#recipe-name, #recipe-ingredients").val(""); // Clear input fields
            fetchRecipes(); // Refresh list
        }
    });

    // **READ** Recipes
    async function fetchRecipes() {
        const response = await fetch(apiURL);
        const recipes = await response.json();
        $("#recipe-list").html("");
        recipes.forEach(recipe => {
            $("#recipe-list").append(`
                <div class="recipe-card">
                    <h4>${recipe.name}</h4>
                    <p>${recipe.ingredients}</p>
                    <button class="delete-btn" data-id="${recipe.id}">Delete</button>
                </div>
            `);
        });
    }

    // **DELETE** Recipe
    $(document).on("click", ".delete-btn", async function() {
        const recipeId = $(this).data("id");
        await fetch(`${apiURL}/${recipeId}`, { method: "DELETE" });
        fetchRecipes(); // Refresh list
    });

    fetchRecipes(); // Load recipes initially
});


async function onCreateRecipeClick() {
    const response = await fetch('http://localhost:3000/recipes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: 'recipe', recipeId: 1 })
    });

    const newlyCreatedItem = await response.json();
    lastCreatedItem = newlyCreatedItem;
}

async function onDeleteRecipeClick() {
    if (!lastCreatedItem) {
        console.log('No item created yet to delete');
        return;
    }
    await fetch(`http://localhost:3000/recipes/${lastCreatedItem.id}`, {
        method: 'DELETE'
    });
}

