const root = document.querySelector(".root");
const btns = document.querySelectorAll("button");
const url = "https://www.themealdb.com/api/json/v1/1/search.php?f="; 
const btn = document.querySelector(".btn")
const input = document.querySelector("input");

const getMeals = (letter = "b") => {
    fetch(url + letter)
        .then((res) => res.json())
        .then((data) => {
            if (data.meals === null) {
                root.innerHTML = "No meals";
            } else {
                showMeals(data.meals);
            }
        })
};
btn.onclick = () => {
    if (input.value.trim() === "") { 
        console.log("Write in input");
    } else { 
        getMeals(input.value); 
    }
};  

function showMeals(arr) {
    root.innerHTML = "";
    for (const obj of arr) {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => getMealById(obj.idMeal);
        card.innerHTML = `
            <img src=${obj.strMealThumb} />
            <h4>${obj.strMeal}</h4>`;
        root.appendChild(card);
    }
}

btns.forEach((btn) => {
    btn.onclick = () => {
        getMeals(btn.innerText);
    };
});

function getMealById(id) {
    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            showSingleMeal(meal);
            let ingredients = [];
            for (let i = 1; i <= 20; i++) {
                if (meal[`strIngredient${i}`] && meal[`strIngredient${i}`].length > 0) {
                    ingredients.push(meal[`strIngredient${i}`]);
                }
            }
            showIngrs(ingredients);
        })
}

function showSingleMeal(obj) {
    root.innerHTML = `
    <div>
        <h1>${obj.strMeal}</h1>
        <img src=${obj.strMealThumb}>
        <iframe width="560" height="315" src=${obj.strYoutube.replace('/watch?v=', '/embed/')} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <p>${obj.strInstructions}</p>
    </div>`;
}

function showIngrs(arr) {
    const ul = document.createElement("ul");
    root.appendChild(ul);
    for (const el of arr) {
        ul.innerHTML += `<li>
            <img src="https://www.themealdb.com/images/ingredients/${el}-Small.png" />
            <h2>${el}</h2>
        </li>`;
    }
}



