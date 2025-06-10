const express = require("express");
const app = express();

app.get("/", function (request, response) {

    response.send("Welcome to Chef Marco's Italian Bistro!").end();
});

// Creating a constant var for the menu array
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


app.get("/menu", function (request, response){
    response.json(menu)
})

//Tell the express app that you want it to listen on port 8080 of your computer
app.listen(8080, function () {

    //This function gets executed when the app starts listening
    console.log("Server is listening on 8080");
});

app.get("/menu/:id", function(request, response) {
    const itemId = parseInt(request.params.id)
    const item = menu.find(menuItem => menuItem.id === itemId)

    if (item) {
        response.json(item)
    } else {
        response.status(404).json({error: 'Menu item not found'})
    }
})

app.get('/menu/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = menu.find(menuItem => menuItem.id === itemId);
  
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Menu item not found' });
    }
  });
  