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

  it("Loads the locations page, shows the location names", () => {
    cy.contains("Rekonstruktion des Sanchi-Tores").should("be.visible");
    cy.contains("Schlüterhof").should("be.visible");
    cy.contains("Karl-Liebknecht-Brücke").should("be.visible");
    cy.contains("Berlin Cathedral").should("be.visible");
    cy.contains("Humboldt Forum").should("be.visible");
  });

  it("Displays the correct number of locations", () => {
    cy.get("#location-list").find("figure").should("have.length", 5);
  });

  it("Filters locations based on selected type", () => {
    cy.get(".type-dropdown").select("Church");
    cy.get("#location-list").find("figure").should("have.length", 1);
    cy.contains("Berlin Cathedral").should("be.visible");
  });

  it("Filters locations based on selected type v.2", () => {
    cy.get(".type-dropdown").select("Museum");
    cy.get("#location-list").find("figure").should("have.length", 1);
    cy.contains("Humboldt Forum").should("be.visible");
  });

  it("Filters locations based on selected type v.3", () => {
    cy.get(".type-dropdown").select("Other");
    cy.get("#location-list").find("figure").should("have.length", 3);
    cy.contains("Rekonstruktion des Sanchi-Tores").should("be.visible");
    cy.contains("Schlüterhof").should("be.visible");
    cy.contains("Karl-Liebknecht-Brücke").should("be.visible");
  });

  it("Filters locations based on selected type v.4", () => {
    cy.get(".type-dropdown").select("All");
    cy.get("#location-list").find("figure").should("have.length", 5);
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
