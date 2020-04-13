const express = require("express");
const router = express.Router();
const Projects = require("../data/helpers/projectModel");
const Actions = require("../data/helpers/actionModel");

//GET projects
router.get("/", validateProjectId, (req, res) => {
    const id = req.params.id;
    Projects.get(id)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
        res.status(500).json({ error: "problem retrieving projects" });
    });
});

//GET projects by id
router.get("/:id", validateProjectId, (req, res) => {
    const id = req.params.id;
    Projects.get(id)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
        res.status(500).json({ error: "problem retrieving project" });
    });   
});

//GET actions on projects by project id
router.get("/:id/actions", validateProjectId, (req, res) => {
    const projectId = req.params.id;
    Projects.getProjectActions(projectId)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
        res.status(500).json({ error: "problem retrieving project" });
    });   
});

//POST to projects
router.post("/", validateProject, (req, res) => {
    const project = req.body;
    Projects.insert(project)
    .then(project => {
        res.status(201).json(project);
    })
    .catch(err => {
        res.status(500).json({ error: "problem adding project" });
    });
});

//POST to projects - actions
router.post("/:id/actions", validateProjectId, validateAction, (req, res) => {
    const action = req.body;
     action.project_id = req.params.id;
    Actions.insert(action)
    .then(action => {
        res.status(201).json(action);
    })
    .catch(err => {
        res.status(500).json({ error: "problem adding action" });
    });
})

//DELETE project
router.delete("/:id", validateProjectId, (req, res) => {
    const id = req.params.id;
    Projects.remove(id)
    .then(project => {
        res.status(201).json(project);
    })    
    .catch(err => {
        res.status(500).json({ error: "problem deleting project" })
    })
})

//PUT project
router.put("/:id", validateProjectId, validateProject, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    Projects.update(id, changes)
    .then(project => {
        res.status(201).json(project);
    })    
    .catch(err => {
        res.status(500).json({ error: "problem deleting project" });
    });    
});

//custom middleware
function validateProjectId(req, res, next) {
    //validateProjectId validates the project id on every request that expects a project id parameter
    Projects.get(req.params.id)
      .then(project => {
        if (project) {
          project = req.project;
          next();
        } else {
          res.status(400).json({ message: "invalid project id" });
        }
      })
  }

  function validateProject(req, res, next) {
      //validateProject validates the body on a request to create a new project
    if (!req.body) {
        res.status(400).json({ message: 'missing project data' })
      } else if (!req.body.name || !req.body.description) {
        res.status(400).json({ message: "please include both name & description fields" })
      } else {
        next();
      }
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