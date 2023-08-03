import { mockLocation } from "../utils.js";

describe("Startup Page", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://maps.googleapis.com/**",
      cy
        .spy((req) => {
          req.destroy();
        })
        .as("mapsRequest")
    );

    const latitude = 35.172744;
    const longitude = 137.05802;
    cy.visit("/", mockLocation(latitude, longitude));
    cy.intercept(
      "GET",
      `http://localhost:3000/?longitude=${longitude}&latitude=${latitude}`,
      { fixture: "response.json" }
    );

    cy.wait(5000);
  });

  it("Loads the Startup page with start trail button", () => {
    cy.contains("Start trail").should("be.visible");
  });

  it("Loads the Startup page, clicks link at top, returns to startup", () => {
    cy.get("#header-link").click();
    cy.contains("Start trail").should("be.visible");
  });

  it("Makes a request to the Google Maps API", () => {
    cy.get("@mapsRequest").should("have.been.called");
  });

  it("Opens the locations page when the link is clicked", () => {
    cy.get("#start-trail").click().wait(2000);
    cy.url().should("include", "/locations");
  });
});
