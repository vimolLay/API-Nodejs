const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

//listing
router.get(`/`, async (req, res) => {
  const categoryList = await Category.find(req.params.id);

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
});

//view
router.get(`/:id`, async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(500).json({
      message: "The category with the given ID was not found",
      success: false,
    });
  }
  res.status(200).send(category);
});

// create
router.post(`/`, async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });

  category = await category.save();

  if (!category) return res.status(400).send("The category cannot be created");

  res.send(category);
});

//update
router.put(`/:id`, async (req, res) => {
  let category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    {
      new: true,
    }
  );

  if (!category) return res.status(400).send("The category cannot be updated");

  res.send(category);
});

//delete
router.delete("/:id", (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res.status(200).json({
          success: true,
          message: "the category is successfully deleted..",
        });
      } else {
        return res
          .status(404)
          .json({ sucess: false, message: "The category cannot be found.." });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

//GET/Count

router.get(`/get/count`, async (req, res) => {
  const categoryCount = await Category.countDocuments();
  if (!categoryCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    categoryCount: categoryCount,
  });
});

module.exports = router;
