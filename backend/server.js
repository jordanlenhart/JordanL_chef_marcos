// Exercise: Setting Up a Server

const express = require("express");
const app = express();

// Creating the initial Message
app.get("/", function (request, response) {

    response.send("Welcome to Chef Marco's Italian Bistro!").end();
});

//Tell the express app that you want it to listen on port 8080 of your computer
app.listen(8080, function () {

  //This function gets executed when the app starts listening
  console.log("Server is listening on 8080");
});

// Exercise: Logging (App Level)

app.use(function (request, response, next) {
  const time = new Date().toISOString()
  console.log(`[${time}] ${request.method} ${request.path}`)
  next()
})

// Creating a constant variable for the menu array
const menu = [
    {
      id: 1,
      dish: "Baked Shrimp Scampi",
      price: 20
    },
    {
      id: 2,
      dish: "Chicken Parmigiana",
      price: 14
    },
    {
      id: 3,
      dish: "Margherita Pizza",
      price: 17
    },
    {
      id: 4,
      dish: "Penne with Vodka Sauce",
      price: 18
    }
   ]   


   
// Exercise: Chef Marco needs a menu!

// Using get to bring up the menu array, tested using Postman
// app.get("/menu", function (request, response){
//     response.json(menu)
// })

// Using get to show the menu items individually based on their Id
app.get("/menu/:id", function(request, response) {
    const itemId = parseInt(request.params.id)
    const item = menu.find(menuItem => menuItem.id === itemId)

    if (item) {
        response.json(item)
    } else {
        response.status(404).json({error: 'Menu item not found'})
    }
})

// Exercise: Adding a Not Implemented response

app.use(express.json());

// Using post to post new reservations
// app.post("/reservations", function (request, response) {

//   // this shows up in the terminal
//   console.warn("POST /reservations called, but not implemented.")

//   // this shows up in Postman
//   response.status(501).send("Route exists but isn’t implemented yet!")
// })


// Exercise: Chef Marco wants the search

app.get("/menu", function (request, response) {
  // setting the max price
  const maxPrice = parseFloat(request.query.maxPrice)

  // if no maxPrice, return the menu
  if (isNaN(maxPrice)) {
    return response.json(menu)
  }

  // filter by price with .filter
  const filteredMenuItems = menu.filter(menuItem => menuItem.price <= maxPrice)

  response.json(filteredMenuItems)
})


// Exercise: Chef Marco’s Handling Reservations

app.post("/reservations", function (request, response) {
  const { name, date, time } = request.body
  
  if(!name || !date || !time) {
    return response.status(400).send("Missing fields.")
  }

  response.status(201).send(`${name}, thank you for reserving on ${date} at ${time}`)
})



// Exercise: Protecting Chef Marco’s Recipes (Route Level)

function checkChef(request, response, next) {
  if (request.headers.role === "chef") {
    next()
  } else {
    response.status(403).json({error: "Access denied. You are not Chef."})
  }
}

app.get("/chef/secret-recipe", checkChef, function (request, response) {
  response.json({
    recipe: {
      name: "Marco's Masterpiece",
      ingredients: [
        "various cheeses",
        "various sauces",
        "various spices",
        "and a whole lotta Italian"
      ],
      instructions: "Mix in a pot, bake at 400°F for 30 minutes. Buongiorno."
    }
  })
})