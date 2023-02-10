const express = require("express");
const fs = require("fs");
const router = express.Router();
const uniqid = require("uniqid");

router.use((req, res, next) => {
    next();
});

router.get("/", (req, res) => {
    res.send("Express Homepage");
});

router.get("/cocktails_list", (req, res) => {
    let cocktail_recipes_data = fs.readFileSync("data/cocktail_recipes.json");
    let parse_cocktail_recipes_data = JSON.parse(cocktail_recipes_data);
    res.json(parse_cocktail_recipes_data);
});

router.get("/cocktails_list/:cocktailId", (req, res) => {
    const cocktailId = req.params.cocktailId;
    let cocktail_recipes_data = fs.readFileSync("data/cocktail_recipes.json");
    let parse_cocktail_recipes_data = JSON.parse(cocktail_recipes_data);
    let currentCocktailDetails = parse_cocktail_recipes_data.find(cocktail => cocktail.id === cocktailId);
    res.json(currentCocktailDetails);
});

router.post("/cocktails_list", (req, res) => {
    let new_data = (req.body);
    let cocktail_recipes_data = fs.readFileSync("data/cocktail_recipes.json");
    let parse_cocktail_recipes_data = JSON.parse(cocktail_recipes_data);
    parse_cocktail_recipes_data.push(new_data);
    let stringify_cocktail_recipes_data = JSON.stringify(parse_cocktail_recipes_data);
    fs.writeFileSync('data/cocktail_recipes.json', stringify_cocktail_recipes_data);
    res.status(201).send("Created New Cocktail Recipe");
});

//exports the route to be used (similar to a component in react) on the server js index.js
module.exports = router;