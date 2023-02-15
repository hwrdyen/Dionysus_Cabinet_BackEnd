const express = require("express");
const fs = require("fs");
const router = express.Router();
const uniqid = require("uniqid");

router.use((req, res, next) => {
    next();
});

// GET command

// Get /
router.get("/", (req, res) => {
    res.send("Express Homepage");
});

// Get /cocktails_list
router.get("/cocktails_list", (req, res) => {
    let cocktail_recipes_data = fs.readFileSync("data/cocktail_recipes.json");
    let parse_cocktail_recipes_data = JSON.parse(cocktail_recipes_data);
    res.json(parse_cocktail_recipes_data);
});

// Get /cocktails_list/:cocktailId
router.get("/cocktails_list/:cocktailId", (req, res) => {
    const cocktailId = req.params.cocktailId;
    let cocktail_recipes_data = fs.readFileSync("data/cocktail_recipes.json");
    let parse_cocktail_recipes_data = JSON.parse(cocktail_recipes_data);
    let currentCocktailDetails = parse_cocktail_recipes_data.find(cocktail => cocktail.id === cocktailId);
    res.json(currentCocktailDetails);
});

// Get /taste_preferences_list
router.get("/taste_preferences_list", (req, res) => {
    let taste_preferences_list_data = fs.readFileSync("data/taste_preferences_list.json");
    let parse_taste_preferences_list_data = JSON.parse(taste_preferences_list_data);
    res.json(parse_taste_preferences_list_data);
});

// Get /alcohol_list
router.get("/alcohol_list", (req, res) => {
    let alcohol_list_data = fs.readFileSync("data/alcohol_list.json");
    let parse_alcohol_list_data = JSON.parse(alcohol_list_data);
    res.json(parse_alcohol_list_data);
});

// Get /represent_mood_list
router.get("/represent_mood_list", (req, res) => {
    let represent_mood_list_data = fs.readFileSync("data/represent_mood_list.json");
    let parse_represent_mood_list_data = JSON.parse(represent_mood_list_data);
    res.json(parse_represent_mood_list_data);
});

// POST command

// Post /cocktails_list
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