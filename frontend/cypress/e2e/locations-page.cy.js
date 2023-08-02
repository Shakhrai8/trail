describe("Locations Page", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3000/**", {
      fixture: "response.json",
    });
    cy.visit("/locations");
    cy.wait(5000);
  });

  it("Loads the locations page, clicks link at top, returns to startup", () => {
    cy.get("#header-link").click();
    cy.contains("Start trail").should("be.visible");
  });

  it("Loads the locations page, shows a location", () => {
    cy.contains("Wormwood Scrubs").should("be.visible");
  });

  it("Displays the correct number of locations", () => {
    cy.get("#location-list").find("figure").should("have.length", 5);
  });

  it("Filters locations based on selected type", () => {
    cy.get(".type-dropdown").select("Church");
    cy.get("#location-list").find("figure").should("have.length", 1);
  });

  it("Sorts locations based on distance", () => {
    cy.get("#location-list figure .distance")
      .first()
      .then(($firstDistance) => {
        const firstDistance = parseFloat($firstDistance.text());
        cy.get("#location-list figure .distance")
          .last()
          .then(($lastDistance) => {
            const lastDistance = parseFloat($lastDistance.text());
            assert.isTrue(firstDistance < lastDistance);
          });
      });
  });

  it("Redirects to individual location page on click", () => {
    cy.get("#location-list figure a").first().click();
    cy.url().should("include", "/locations/");
  });
});
