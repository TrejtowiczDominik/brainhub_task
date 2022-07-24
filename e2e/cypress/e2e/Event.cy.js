describe("Event form end 2 end tests", () => {
  it("Site was loaded and form displayed", () => {
    cy.visit("/");

    cy.contains("Your first name");
    cy.contains("Your last name");
    cy.contains("Your e-mail");
    cy.contains("Event date");
    cy.contains("Submit");
  });

  it("Firt name entered correctly - button disabled", () => {
    cy.visit("/");

    cy.get("#firstName")
      .focus()
      .type("test name", { delay: 50 })
      .should("have.value", "test name");

    cy.contains("Submit").should("be.disabled");
  });

  it("Firt name skipped - proper message displayed", () => {
    cy.visit("/");

    cy.get("#firstName").focus();
    cy.get("#lastName").focus();
    cy.contains("Please enter your first name");
  });

  it("Last name entered correctly - button disabled", () => {
    cy.visit("/");

    cy.get("#lastName")
      .focus()
      .type("test last name", { delay: 50 })
      .should("have.value", "test last name");

    cy.contains("Submit").should("be.disabled");
  });

  it("Last name skipped - proper message displayed", () => {
    cy.visit("/");

    cy.get("#lastName").focus();
    cy.get("#email").focus();
    cy.contains("Please enter your last name");
  });

  it("Email entered correctly - button disabled", () => {
    cy.visit("/");

    cy.get("#email")
      .focus()
      .type("fake@email.com", { delay: 50 })
      .should("have.value", "fake@email.com");

    cy.contains("Submit").should("be.disabled");
  });

  it("Email entered incorrectly - button disabled", () => {
    cy.visit("/");

    cy.get("#email").focus().type("fake@email", { delay: 50 });
    cy.get("#lastName").focus();

    cy.contains("Please enter correct e-mail addres");

    cy.contains("Submit").should("be.disabled");
  });

  it("Email skipped - proper message displayed", () => {
    cy.visit("/");

    cy.get("#email").focus();
    cy.get("#eventDate").focus();
    cy.contains("Please enter correct e-mail address");
  });

  it("All data entered - button enabled", () => {
    cy.visit("/");

    cy.get("#firstName").type("test first name");
    cy.get("#lastName").type("test last name");
    cy.get("#email").type("fake@email.com");
    cy.get("#eventDate").type("11/04/2022");

    cy.contains("Submit").should("be.enabled");
  });

  it("backend validation failed - request without event data", () => {
    cy.request({
      method: "POST",
      url: "/add-event",
      failOnStatusCode: false,
      body: {},
    }).then((response) => {
      console.log(response);
      expect(response).property("status").to.equal(422);
      expect(response.body).to.have.property(
        "message",
        "Validation failed, request without event information"
      );
    });
  });

  it("backend validation failed - request without first name", () => {
    cy.request({
      method: "POST",
      url: "/add-event",
      failOnStatusCode: false,
      body: {
        event: {
          lastName: "test last name",
          email: "fake@email.com",
          eventDate: new Date("11/04/2022").getTime(),
        },
      },
    }).then((response) => {
      console.log(response);
      expect(response).property("status").to.equal(422);
      expect(response.body).to.have.property(
        "message",
        "Validation failed, first name is missing"
      );
    });
  });

  it("backend validation failed - request without last name", () => {
    cy.request({
      method: "POST",
      url: "/add-event",
      failOnStatusCode: false,
      body: {
        event: {
          firstName: "test name",
          email: "fake@email.com",
          eventDate: new Date("11/04/2022").getTime(),
        },
      },
    }).then((response) => {
      console.log(response);
      expect(response).property("status").to.equal(422);
      expect(response.body).to.have.property(
        "message",
        "Validation failed, last name is missing"
      );
    });
  });

  it("backend validation failed - request without email", () => {
    cy.request({
      method: "POST",
      url: "/add-event",
      failOnStatusCode: false,
      body: {
        event: {
          firstName: "test name",
          lastName: "test last name",
          eventDate: new Date("11/04/2022").getTime(),
        },
      },
    }).then((response) => {
      console.log(response);
      expect(response).property("status").to.equal(422);
      expect(response.body).to.have.property(
        "message",
        "Validation failed, email is missing"
      );
    });
  });

  it("backend validation failed - request with incorrect email", () => {
    cy.request({
      method: "POST",
      url: "/add-event",
      failOnStatusCode: false,
      body: {
        event: {
          firstName: "test name",
          lastName: "test last name",
          email: "fakemail",
          eventDate: new Date("11/04/2022").getTime(),
        },
      },
    }).then((response) => {
      console.log(response);
      expect(response).property("status").to.equal(422);
      expect(response.body).to.have.property(
        "message",
        "Validation failed, email is incorrect"
      );
    });
  });

  it("backend validation failed - request without event date", () => {
    cy.request({
      method: "POST",
      url: "/add-event",
      failOnStatusCode: false,
      body: {
        event: {
          firstName: "test name",
          lastName: "test last name",
          email: "fake@email.com",
        },
      },
    }).then((response) => {
      console.log(response);
      expect(response).property("status").to.equal(422);
      expect(response.body).to.have.property(
        "message",
        "Validation failed, event date is missing"
      );
    });
  });

  it("Send correct data", () => {
    cy.visit("/");

    cy.get("#firstName").type("test first name");
    cy.get("#lastName").type("test last name");
    cy.get("#email").type("fake@email.com");
    cy.get("#eventDate").type("11/04/2022");

    cy.intercept("POST", "/add-event").as("event");
    cy.contains("Submit").click();
    cy.wait("@event").should(({ request, response }) => {
      expect(request && request.body && request.body.event).to.have.property(
        "firstName",
        "test first name"
      );
      expect(request && request.body && request.body.event).to.have.property(
        "lastName",
        "test last name"
      );
      expect(request && request.body && request.body.event).to.have.property(
        "email",
        "fake@email.com"
      );
      expect(request && request.body && request.body.event).to.have.property(
        "eventDate",
        new Date("11/04/2022").getTime()
      );
      expect(response).to.have.property("statusCode", 201);
      expect(response.body).to.have.property(
        "message",
        "Data saved successfully"
      );
      cy.contains("Data saved successfully");
    });
  });
});
