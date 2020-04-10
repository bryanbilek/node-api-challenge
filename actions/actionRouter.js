const express = require("express");
const router = express.Router();
const Actions = require("../data/helpers/actionModel");

//GET actions
router.get("/", (req, res) => {
    const { id } = req.params.id;
    Actions.get(id)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(err => {
        res.status(500).json({ error: "problem retrieving actions" });
    });
});

//GET action by id
router.get("/:id", (req, res) => {
    const { id } = req.params.id;
    Actions.get(id)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(err => {
        res.status(500).json({ error: "problem retrieving action" });
    });
});

//DELETE action
router.delete("/:id", (req, res) => {
    const { id } = req.params.id;
    Actions.remove(id)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(err => {
        res.status(500).json({ error: "problem deleting action" });
    });
});

//PUT action
router.put("/:id", (req, res) => {
    const { id } = req.params.id;
    const { changes } = req.body;
    Actions.update(id, changes)
    .then(action => {
        res.status(201).json(action);
    })    
    .catch(err => {
        res.status(500).json({ error: "problem updating action" });
    }); 
});

//custom middleware

module.exports = router;