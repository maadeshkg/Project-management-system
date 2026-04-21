const router = require("express").Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");

// Create Project
router.post("/", auth, async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.json(project);
});

// Get Projects
router.get("/", auth, async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// ✅ UPDATE project
router.put("/:id", auth, async (req, res) => {
    try {
      const updated = await Project.findByIdAndUpdate(
        req.params.id,
        { title: req.body.title },
        { new: true }
      );
  
      res.json(updated);
    } catch (err) {
      res.status(500).json("Update failed");
    }
  });

// Delete Project
router.delete("/:id", auth, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

module.exports = router;

