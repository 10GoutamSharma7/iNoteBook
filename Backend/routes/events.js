const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const fetchuser = require("../middleware/fetchuser"); // if you already use auth

// 📌 Get all events for a user
router.get("/", fetchuser, async (req, res) => {
  try {
    const events = await Event.find({ user: req.user.id });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 📌 Add new event
router.post("/", fetchuser, async (req, res) => {
  try {
    const { title, start, end, allDay } = req.body;
    const event = new Event({
      user: req.user.id,
      title,
      start,
      end,
      allDay,
    });

    const savedEvent = await event.save();
    res.json(savedEvent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 📌 Update an event
router.put("/:id", fetchuser, async (req, res) => {
  try {
    const { title, start, end, allDay } = req.body;
    let event = await Event.findById(req.params.id);

    if (!event) return res.status(404).send("Event not found");
    if (event.user.toString() !== req.user.id)
      return res.status(401).send("Not allowed");

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: { title, start, end, allDay } },
      { new: true }
    );

    res.json(updatedEvent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 📌 Delete an event
router.delete("/:id", fetchuser, async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) return res.status(404).send("Event not found");
    if (event.user.toString() !== req.user.id)
      return res.status(401).send("Not allowed");

    await Event.findByIdAndDelete(req.params.id);
    res.json({ msg: "Event deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
