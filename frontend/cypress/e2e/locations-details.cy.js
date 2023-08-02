describe("Locations Details Page", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3000/**", {
      fixture: "response.json",
    });
    cy.visit("/locations");
    cy.wait(5000);
  });

  it("Loads the first location details page with photo and data", () => {
    cy.contains(".location-header", "Schlüterhof").click();
    cy.url().should("include", "/locations/");
    cy.get(".location-photo").should("be.visible");
    cy.contains(".location-header", "Schlüterhof").should("be.visible");
    cy.contains(".rating", 4.6).should("be.visible");
    cy.contains(".location-description", "Description not available").should(
      "be.visible"
    );
  });

  it("Shows more details including Google Maps link", () => {
    cy.get("#location-list figure a").first().click();
    cy.get("#more-details").click();
    cy.contains("Google Maps")
      .should("have.attr", "href")
      .and("match", /^https:\/\/www\.google\.com\/maps\/search/);
    cy.get("#more-details").click();
    cy.contains("Google Maps").should("not.exist");
  });

  it("Loads the second location details page with photo and data", () => {
    cy.contains(".location-header", "Karl-Liebknecht-Brücke").click();
    cy.url().should("include", "/locations/");
    cy.get(".location-photo").should("be.visible");
    cy.contains(".location-header", "Karl-Liebknecht-Brücke").should(
      "be.visible"
    );
    cy.contains(".rating", 4.5).should("be.visible");
    cy.contains(".location-description", "Description not available").should(
      "be.visible"
    );
  });

  it("Loads the third location details page with photo and data", () => {
    cy.contains(".location-header", "Rekonstruktion des Sanchi-Tores").click();
    cy.url().should("include", "/locations/");
    cy.get(".location-photo").should("be.visible");
    cy.contains(".location-header", "Rekonstruktion des Sanchi-Tores").should(
      "be.visible"
    );
    cy.contains(".rating", 4.9).should("be.visible");
    cy.contains(
      ".location-description",
      "Ladies and gentlemen, welcome to our historical tour of Berlin!"
    ).should("be.visible");
  });
});
