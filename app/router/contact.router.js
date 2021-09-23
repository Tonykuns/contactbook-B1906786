const contacts = require('../controllers/contact.controller');
const express = require('express');

module.exports = (app) => {
    var router = express.Router();

    router.post("/", contacts.create);

    router.get("/", contacts.findAll);

    router.get("/favorite", contacts.findAllFavorite);

    router.get("/:id", contacts.findOne);

    router.put("/:id", contacts.update);

    router.delete("/:id", contacts.delete);

    router.delete("/", contacts.deleteAll);

    app.use("/api/contacts", router);
};