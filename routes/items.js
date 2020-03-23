const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const User = require("../models/User");
const Item = require("../models/Item");

// @route     GET api/items
// @desc      Get all users items
// @access    Private

router.get("/", auth, async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     POST api/items
// @desc      Add new item
// @access    Private

router.post(
  "/",
  [
    auth,
    [
      check("text", "text is required")
        .not()
        .isEmpty(),
      check("amount", "amount is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text, amount, date } = req.body;

    try {
      const newItem = new Item({
        text,
        amount,
        date,
        user: req.user.id
      });

      const item = await newItem.save();

      res.json(item);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route     PUT api/items/:id
// @desc      Update item
// @access    Private
router.put("/:id", auth, async (req, res) => {
  const { text, amount, date } = req.body;

  // Build item object
  const itemFields = {};
  if (text) itemFields.text = text;
  if (amount) itemFields.amount = amount;
  if (date) itemFields.date = date;

  try {
    let item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ msg: "Item not found" });

    // Make sure user owns items
    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: itemFields },
      { new: true }
    );

    res.json(item);
  } catch (err) {
    console.error(er.message);
    res.status(500).send("Server Error");
  }
});

// @route     DELETE api/items/:id
// @desc      Delete item
// @access    Private

router.delete("/:id", auth, async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ msg: "Item not found" });

    // Make sure user owns items
    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Item.findByIdAndRemove(req.params.id);

    res.json({ msg: "Item removed" });
  } catch (err) {
    console.error(er.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
