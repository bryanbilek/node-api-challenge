const express = require("express");
const router = express.Router();
const Actions = require("../data/helpers/actionModel");
// const Projects = require("../projects/projectRouter");

//GET actions
router.get("/", validateActionId, (req, res) => {
    const id = req.params.id;
    Actions.get(id)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(err => {
        res.status(500).json({ error: "problem retrieving actions" });
    });
});

//GET action by id
router.get("/:id", validateActionId, (req, res) => {
    const id = req.params.id;
    Actions.get(id)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(err => {
        res.status(500).json({ error: "problem retrieving action" });
    });
});

//DELETE action
router.delete("/:id", validateActionId, (req, res) => {
    const id = req.params.id;
    Actions.remove(id)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(err => {
        res.status(500).json({ error: "problem deleting action" });
    });
});

//PUT action
router.put("/:id", validateActionId, validateAction, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    Actions.update(id, changes)
    .then(action => {
        res.status(201).json(action);
    })    
    .catch(err => {
        res.status(500).json({ error: "problem updating action" });
    }); 
});

//custom middleware
function validateActionId(req, res, next) {
    //validateActionId validates the action id on every request that expects a project id parameter
    Actions.get(req.params.id)
      .then(action => {
        if (action) {
          action = req.action;
          next();
        } else {
          res.status(400).json({ message: "invalid action id" });
        }
      })
  }

  function validateAction(req, res, next) {
    //validateAction validates the body on a request to create a new action
    if (!req.body) {
        res.status(400).json({ message: 'missing action data' })
      } else if (!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(400).json({ message: "please fill in all fields as they are required" })
      } else if(req.body.description.length > 128) {
          res.status(400).json({ message: "Exceeded max characters of 128"});
      } else {
          next();
      }
  }

module.exports = router;