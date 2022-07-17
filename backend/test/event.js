const expect = require("chai").expect;
const mongoose = require("mongoose");

const EventController = require("../controllers/event");
const Event = require("../models/event");

describe("Event Controller", function () {
  before(function (done) {
    mongoose
      .connect(
        "mongodb+srv://testUser:BHvLVY3R3RYwc8hB@cluster0.jop4sgk.mongodb.net/?retryWrites=true&w=majority"
      )
      .then(() => {
        done();
      });
  });

  beforeEach(function () {});

  afterEach(function () {});

  it("request without body - http status 422", function (done) {
    const req = {};

    EventController.postAddEvent(req, {}, () => {}).then((result) => {
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 422);
      done();
    });
  });

  it("request body without event - http status 422", function (done) {
    const req = { body: {} };

    EventController.postAddEvent(req, {}, () => {}).then((result) => {
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 422);
      expect(result).to.have.property(
        "message",
        "Validation failed, request without event information"
      );
      done();
    });
  });

  it("event without first name - http status 422", function (done) {
    const req = {
      body: {
        event: {
          lastName: "test",
          email: "test@test.pl",
          eventDate: "17/11/2023",
        },
      },
    };

    EventController.postAddEvent(req, {}, () => {}).then((result) => {
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 422);
      expect(result).to.have.property(
        "message",
        "Validation failed, first name is missing"
      );
      done();
    });
  });

  it("event without last name - http status 422", function (done) {
    const req = {
      body: {
        event: {
          firstName: "test",
          email: "test@test.pl",
          eventDate: "17/11/2023",
        },
      },
    };

    EventController.postAddEvent(req, {}, () => {}).then((result) => {
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 422);
      expect(result).to.have.property(
        "message",
        "Validation failed, last name is missing"
      );
      done();
    });
  });

  it("event without email - http status 422", function (done) {
    const req = {
      body: {
        event: {
          firstName: "test",
          lastName: "test",
          eventDate: "17/11/2023",
        },
      },
    };

    EventController.postAddEvent(req, {}, () => {}).then((result) => {
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 422);
      expect(result).to.have.property(
        "message",
        "Validation failed, email is missing"
      );
      done();
    });
  });

  it("event without date - http status 422", function (done) {
    const req = {
      body: {
        event: {
          firstName: "test",
          lastName: "test",
          email: "test@test.pl",
        },
      },
    };

    EventController.postAddEvent(req, {}, () => {}).then((result) => {
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 422);
      expect(result).to.have.property(
        "message",
        "Validation failed, event date is missing"
      );
      done();
    });
  });

  it("event created properly - http status 201", async function () {
    const req = {
      body: {
        event: {
          firstName: "test",
          lastName: "test",
          email: "test@test.pl",
          eventDate: "17/11/2023",
        },
      },
    };

    const res = {
      statusCode: 500,
      message: null,
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.message = data.message;
      },
    };

    EventController.postAddEvent(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(201);
      expect(res.message).to.be.equal("Data saved successfully");
      done();
    });
  });

  it("response object defined - http status 500", function (done) {
    const req = {
      body: {
        event: {
          firstName: "test",
          lastName: "test",
          email: "test@test.pl",
          eventDate: "17/11/2023",
        },
      },
    };

    EventController.postAddEvent(req, {}, () => {}).then((result) => {
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 500);
      done();
    });
  });

  after(function (done) {
    Event.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
