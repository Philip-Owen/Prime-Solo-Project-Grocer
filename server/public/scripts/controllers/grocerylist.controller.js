myApp.controller('GroceryListController', ['RecipeService', function(RecipeService) {
  console.log('GroceryListController created');
  var self = this;

  self.recipeList = RecipeService.userRecipes;
  self.addedRecipes = [];
  self.ingredients = [];

  self.addRecipesToList = function(recipe) {
    let ingredientsArray = self.ingredients;
    self.addedRecipes.push(recipe.recipeName);

    // adding ingredients to master list
    for (var i = 0; i < recipe.ingredients.length; i++) {
      ingredientsArray.push(recipe.ingredients[i]);
    }
    // console.log('Original Array of ingredients', ingredientsArray);

    let sortedIngredients = sortCategories(ingredientsArray);
    // console.log('Sorted to categories(fridge)', sortedIngredients.refrigerator);

    let sortedFridgeNoDuplicates = removeDups(sortedIngredients.refrigerator, 'ingredientName');
    // console.log('Fridge no duplicates', sortedFridgeNoDuplicates);

    let sortedFridgeByIngName = sortByProp(sortedIngredients.refrigerator, sortedFridgeNoDuplicates, 'ingredientName');
    // console.log('ingredients sorted by name', sortedFridgeByIngName);

    let fridgeMeasurementsNoDuplicates= getMeasurements(sortedFridgeByIngName);
    console.log('Measurement sort ',fridgeMeasurementsNoDuplicates);

    let fridgeQuantities = calculateQuantities(fridgeMeasurementsNoDuplicates.sortedMeasurements, fridgeMeasurementsNoDuplicates.noDuplicates);
  };


  function calculateQuantities(originalArray, noDuplicates) {
    // console.log('begin', arr);
    console.log('og', originalArray);
    // console.log('no dups', noDuplicates);

    // let quantities = [];
    // for (var i = 0; i < originalArray.length; i++) {
    //   originalArray[i]
    // }



    // for (var i = 0; i < quantities.length; i++) {
    //   for (var j = 0; j < originalArray[i].length; j++) {
    //     console.log(originalArray);
    //   }
    // }

  }


  // for (var i = 0; i < arr.length; i++) {
  //   for (var j = 0; j < arr[i].length; j++) {
  //     arr[i][j][0].quantity = arr[i][j].reduce((x, y) => ({quantity: x.quantity + y.quantity}));
  //     quantitiesNoDups.push();
  //   }
  // }


  function sortCategories(ingredientsArray) {
    let refrigerator = [];
    let freezer = [];
    let pantry = [];

    for (let i = 0; i < ingredientsArray.length; i++) {
      if(ingredientsArray[i].category == 'Refrigerator') {
        refrigerator.push(ingredientsArray[i]);
      }
      if(ingredientsArray[i].category == 'Freezer') {
        freezer.push(ingredientsArray[i]);
      }
      if(ingredientsArray[i].category == 'Pantry') {
        pantry.push(ingredientsArray[i]);
      }
    }

    let sorted = {
      refrigerator,
      freezer,
      pantry,
    };

    return sorted;
  }

  function sortByProp(originalArray, noDuplicates, property) {
    let sortedArray = [];
    for (let i = 0; i < noDuplicates.length; i++) {
      sortedArray.push(originalArray.filter((item) => item[property] == noDuplicates[i][property]));
    }
    // console.log('split by name: ',sortedArray);
    return sortedArray;
  }

  function getMeasurements(originalArray) {
    let sortedMeasurements = [];
    let noDuplicates = [];

    for (let i = 0; i < originalArray.length; i++) {
      noDuplicates.push(removeDups(originalArray[i], 'measurement'));
      // console.log(originalArray[i]);
    }
    // console.log('in getMeasurements( originalArray)', originalArray);
    // console.log('in getMeasurements() noDups', noDuplicates);

    for (var i = 0; i < noDuplicates.length; i++) {
      sortedMeasurements.push(sortByProp(originalArray[i], noDuplicates[i], 'measurement'));
    }
    // console.log('Sorted by measurement', sortedMeasurements);
    let sorted = {
      sortedMeasurements,
      noDuplicates,
    };

    return sorted
  }


  // removes duplicates from an array of objects
  function removeDups(arr, prop) {
      return arr.filter((obj, pos, arr) => {
          return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
      });
  }

  // takes new array of unique elements and adds the quantity total of the matching items in the old array
  // function getIngTotals() {
  //
  //   let newArr = removeDups(a, 'name');
  //
  //   for (var i = 0; i < newArr.length; i++) {
  //     if(a.filter((x) => x.name == newArr[i].name).length > 1) {
  //       let newQuantity = a.filter((x) => x.name == newArr[i].name).reduce((x, y) => ({quantity: x.quantity + y.quantity}));
  //       newArr[i].quantity = newQuantity.quantity;
  //     }
  //   }
  //   return newArr;
  // }
  console.clear();





}]);
