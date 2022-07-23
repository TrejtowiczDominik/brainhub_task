const Event = require("../models/event");

exports.postAddEvent = async (req, res, next) => {
  try {
    if (!req.body) {
      const error = new Error("Validation failed, request without body");
      error.statusCode = 422;
      throw error;
    }
    if (!req.body.event) {
      const error = new Error(
        "Validation failed, request without event information"
      );
      error.statusCode = 422;
      throw error;
    }
    const firstName = req.body.event.firstName;
    const lastName = req.body.event.lastName;
    const email = req.body.event.email;
    const date = req.body.event.eventDate;

    if (!firstName) {
      const error = new Error("Validation failed, first name is missing");
      error.statusCode = 422;
      throw error;
    }
    if (!lastName) {
      const error = new Error("Validation failed, last name is missing");
      error.statusCode = 422;
      throw error;
    }
    if (!email) {
      const error = new Error("Validation failed, email is missing");
      error.statusCode = 422;
      throw error;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      const error = new Error("Validation failed, email is incorrect");
      error.statusCode = 422;
      throw error;
    }
    if (!date) {
      const error = new Error("Validation failed, event date is missing");
      error.statusCode = 422;
      throw error;
    }
    const event = new Event({
      firstName: firstName,
      lastName: lastName,
      email: email,
      eventDate: date,
    });

    await event.save();

    res.status(201).json({ message: "Data saved successfully" });
    return;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    return err;
  }
};
