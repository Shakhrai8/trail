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

    cy.intercept(
      "GET",
      "**/api/maps/**",
      cy
        .spy((req) => {
          req.destroy();
        })
        .as("mapsShortURLRequest")
    );

    cy.intercept(
      "GET",
      "https://api.openai.com/v1/**",
      cy
        .spy((req) => {
          req.destroy();
        })
        .as("ChatGPT")
    );
    cy.visit("/");
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








