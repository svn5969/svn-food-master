
const foodSearch = document.getElementById("food-search");
const searchButton = document.getElementById("search-button");
const foodSection =document.getElementById("food-section");
const ul = document.getElementById("ingredient-list")

let foodImage = document.getElementById("food-image");
let foodName = document.getElementById("food-name");

let ingredients = document.getElementById("ingredients");
let errorDiv =document.getElementById("error-div");
let errorButton =document.getElementById("error-button");


const allMenu =  document.getElementById("all-menu");


//add event handler for search  by name
searchButton.addEventListener("click",()=>{
    errorDiv.style.display="none";
    allMenu.innerHTML="";
   foodSection.style.display="none";
    let foodName = foodSearch.value;
    if (foodName==="") {
        displayErrorMessage();
    } else {
        foodMenu(foodName);
    }
})


//function for display food name and image from api 
let foodMenu= foodName=>{
    let foodLink=`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`
    fetch(foodLink)
    .then(res=>res.json())
    .then(data=>{
        showFood(data);
    })
}




//function for display error message
let displayErrorMessage =()=>{
    errorDiv.style.display="block";
    errorButton.addEventListener("click",(e)=>{
        errorDiv.style.display="none";
        foodSearch.value="";
    })
}




let showFood= data =>{
    let foodItems =data.meals;
    try {
        foodItems.forEach(item => {
            let mealName= item.strMeal;
            let menuImage =item.strMealThumb;
            let oneFood=document.createElement("div");
            oneFood.className="one-food";
            var singleFood=`<div class="image-food-div">
                                <img class="image-food" src="${menuImage}" alt="">
                            </div>
                            <div class="name-food-div">
                                <h3 class="name-food">${mealName}</h3>
                            </div>`
            oneFood.innerHTML=singleFood;
            
            allMenu.appendChild(oneFood);
    
            
            oneFood.addEventListener("click",function(e){
                ul.innerHTML="";
                let foodLink=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.idMeal}`
                fetch(foodLink)
                .then(res=>res.json())
                .then(data=>{
                    
                    showDetail(data);
                    displayIngredientList(data);
                    scrollTop();
                    foodSection.style.display="grid"
                })
            })                 
        });  
    } catch (error) {
        displayErrorMessage();
    }   
}



let showDetail=data =>{
    console.log(data.meals);
    foodImage.src=data.meals[0].strMealThumb;
    foodName.innerHTML=data.meals[0].strMeal;
    ingredients.innerText="Ingredients";
}

// display ingredients Detail list function
let displayIngredientList= data =>{
  // console.log(data.meals);
   let mealObject = data.meals[0];
       let size = Object.keys(mealObject).length;
       
        for (let i = 0; i < size; i++) {
            let index=i+"";
            let newDetail="strDetail"+index;
            let newIngredient="strIngredient"+index;
            let eachIngredient=`${mealObject[newDetail]} ${mealObject[newIngredient]}`;
            if(mealObject[newDetail]!==""&& mealObject[newIngredient]!==""){
                 if ( eachIngredient!=="undefined undefined" && eachIngredient!==null) {
                     let li=document.createElement("li");
                     li.style.listStyle="none";
                     li.innerHTML=`${eachIngredient}`;
                     ul.appendChild(li);
                }
            }
        }
    }


    //function for scroll at the top
let scrollTop=()=>{
    window.scroll({
        top: 90, 
        left: 0, 
        behavior: 'smooth' 
       });
}
    



















































