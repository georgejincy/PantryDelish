   $(document).ready(function(){
      $('.slider').slider({full_width: true});
    });

// Pause slider
$('.slider').slider('pause');
// Start slider
$('.slider').slider('start');
// Next slide
$('.slider').slider('next');
// Previous slide
$('.slider').slider('prev');

/*$('.flexdatalist').flexdatalist({
     minLength: 1,
     textProperty: '{capital}, {name}, {continent}',
     valueProperty: 'id',
     selectionRequired: true,
     visibleProperties: ["name","capital","continent"],
     searchIn: 'name',
     data: 'countries.json'
});
*/
//--------------------------------------------------------------------------------------
//--------------------------FUNCTIONS---------------------------------------------------

// This function checks if a property for the JSON object exists
function checkPropExists(objProp, objRef){

    var isPropExists = true;

    if(objRef.objProp === "undefined"){
            isPropExists = false;
    }

    return isPropExists;

}

//Add Ingredients to Ingredient Array
function addIngredients(inputArray){
    var ingredArray = [];

    for (var i = 0, j = inputArray.length; i < j; i++) {
        //Add check for undefined
            ingredArray[i] = inputArray[i].originalString;
    }

    //Debugging and Logging
    console.log("Ingredients: ")
    for (var i = 0, j = ingredArray.length; i < j; i++) {
            console.log(ingredArray[i]);
    }

    return ingredArray;
}


//--------------------------------------------------------------------------------------
//--------------------------MAIN PROCESS------------------------------------------------

//Spoonacular API call
// This .on("click") function will trigger the AJAX Call
$("#find-recipe").on("click", function(event) {

    // Preventing the submit button from trying to submit the form
    console.log("Button clicked");
    // We're optionally using a form so the user may hit Enter to search instead of clicking the button
    event.preventDefault();    

    // Here we grab the text from the input box
    //var recipe = $("#recipe-input").val();
    // Here we grab the text from the input box
    var recipe = $("#recipe-input").val();

    // Here we construct our URL
    var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?";
            
    //URL parameters
    //addRecipeInformation: If set to true, you get more information about the recipes returned. 
    queryURL = queryURL + "addRecipeInformation=true&";
    //fillIngredients: setting fill Ingredients to true which returns information about the used and missing ingredients in each recipe.
    queryURL = queryURL + "fillIngredients=true&";

    //includeIngredients: A comma-separated list of ingredients that should/must be contained in the recipe.
    queryURL = queryURL + "includeIngredients=oranges%2Cflour%2Cchicken&";

    //instructionsRequired: Whether the recipes must have instructions.
     queryURL = queryURL + "instructionsRequired=true&";

    //limitLicense: Whether to only show recipes with an attribution license.
    queryURL = queryURL + "limitLicense=false";

    //number: The maximal number of recipes to return (default = 5).
    queryURL = queryURL + "number=10&";

    //ranking: Whether to maximize used ingredients (1) or minimize missing ingredients (2) first.
    queryURL = queryURL + "ranking=1";

    //Log queryRL
    console.log(queryURL);

    $.ajax({
        url: queryURL, // The URL to the API. 
        type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
        data: {}, // Additional parameters here
        dataType: 'json',
        success: function(response) {

            var recipeResults = response.results;

            for (var i = 0, j = recipeResults.length; i < j; i++) {

                var recipeTitle = "";
                var readyMins = 0;
                var creditText = "";
                var usedIngredArray = [];
                var missedIngredArray = [];
                var recipeURL = "";

                //Get the recipe title
                console.log("Title: " + recipeResults[i].title);
                if (recipeResults[i].title === "undefined" || recipeResults[i].title === " " ) {
                        recipeTitle = "Not Available";
                }else{
                    recipeTitle = recipeResults[i].title;
                }


                //Get the Ready in Minutes
                console.log("Cooking minutes: " + recipeResults[i].readyInMinutes);
                if (recipeResults[i].readyInMinutes === "undefined" || recipeResults[i].readyInMinutes === 0 ) {
                        readyMins = "Not Available";
                }else{
                    readyMins = recipeResults[i].readyInMinutes;
                }

                //Get the Credit text
                console.log("Credit text: " + recipeResults[i].sourceName);
                if (recipeResults[i].sourceName === "undefined" || recipeResults[i].sourceName === " " ) {
                        creditText = "Not Available";
                }else{
                    creditText = recipeResults[i].sourceName;
                }

                //Get the used Ingredients
                usedIngredArray = addIngredients(recipeResults[i].usedIngredients);

                //Get the missed Ingredients
                missedIngredArray = addIngredients(recipeResults[i].missedIngredients);

                //Get the recipe URL
                console.log("Recipe URL: " + recipeResults[i].sourceUrl);
                if (recipeResults[i].sourceUrl === "undefined" || recipeResults[i].sourceUrl === " " ) {
                        recipeURL = "Not Available";
                }else{
                    recipeURL = recipeResults[i].recipeURL;
                }


            }

            console.log(response);

        },
        error: function(err) { 
            console.log(err);
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "G9TR8P9O0NmshvLEkwMGgtiqMNeVp1xGYY3jsnhUrauT9s3Agv");
        }
    });

});

