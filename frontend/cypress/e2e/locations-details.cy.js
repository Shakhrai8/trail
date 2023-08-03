import { mockLocation } from "../utils.js";

describe("Locations Details Page", () => {
  beforeEach(() => {
    const latitude = 35.172744;
    const longitude = 137.05802;
    cy.visit("/locations", mockLocation(latitude, longitude));
    cy.intercept(
      "GET",
      `http://localhost:3000/?longitude=${longitude}&latitude=${latitude}`,
      { fixture: "response.json" }
    );
    cy.wait(5000);
  });

  it("Loads the first location details page with photo and data", () => {
    cy.contains(".location-header", "Schlüterhof").click();
    cy.url().should("include", "/locations/");
    cy.get(".location-photo")
      .should("have.attr", "src")
      .should(
        "eq",
        "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=Aaw_FcK8POOOtIL6Os2g6ZpgrAu7obgJx32Mhno1QCkIrrlwCcFbx4KLR4A7Frc4G0gDpfooUJNlojYvuoyqKqBzaWBmp0y1IR1JVG_Ez7CLMqcRe_2HJyjXD_5f0AS5NDNvKSRHlMizgctkJxbyswVBYFtn7oMt_dUjiU02T7iENPcs64rX&key=***REMOVED***"
      );
    cy.contains(".location-header", "Schlüterhof").should("be.visible");
    cy.contains(".rating", 4.6).should("be.visible");
    cy.contains(".location-description", "Description not available").should(
      "be.visible"
    );
  });

  it("Shows more details including Google Maps link", () => {
    cy.contains(".location-header", "Schlüterhof").click();
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
    cy.get(".location-photo")
      .should("have.attr", "src")
      .should(
        "eq",
        "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=Aaw_FcKC8grLLiQP9k4oeg8gALo7bO1Zh2oYYt7QFe3ir7Vf-ik3v-0hFn89GPd6uKnYArQEcxnDXbwr9DQwP-ffZGBrWBH3oC8ATRswiQ30MGDJAWYf-w1yeTq1TVvIONOw31Sv3CrYguvMCjp2nSz-GWSsOBmLlFIiaMWLkZy9oAENB8Z-&key=***REMOVED***"
      );
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
    cy.get(".location-photo")
      .should("have.attr", "src")
      .should("eq", "../icon-image-not-found-free-vector.jpg");
    cy.contains(".location-header", "Rekonstruktion des Sanchi-Tores").should(
      "be.visible"
    );
    cy.contains(".rating", 4.9).should("be.visible");
    cy.contains(
      ".location-description",
      "Ladies and gentlemen, welcome to our historical tour of Berlin!"
    ).should("be.visible");
  });

  it("Loads the forth location details page with photo and data", () => {
    cy.contains(".location-header", "Berlin Cathedral").click();
    cy.url().should("include", "/locations/");
    cy.get(".location-photo")
      .should("have.attr", "src")
      .should(
        "eq",
        "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=Aaw_FcI5vFINcIBbnJtrK2woUBTEp7UvTKjlv1jntwMGkkB3Z4xpQKtwwep9uI5dooPNi0aNDM1BVg8bnhq-XGt-2oJxrDUgxLTZ6APx0hq-Ku8s5NBQmwnwcDUAhi9qNTCNqY64xu7VB6bYsvkolP77fTiLqCANtA_JyxEofymeYfkIMkGs&key=***REMOVED***"
      );
    cy.contains(".location-header", "Berlin Cathedral").should("be.visible");
    cy.contains(".rating", 4.6).should("be.visible");
    cy.contains(
      ".location-description",
      "Welcome to Berlin Cathedral, also known as the Berliner Dom, one of the city's most prominent historical landmarks."
    ).should("be.visible");
  });

  it("Loads the five location details page with photo and data", () => {
    cy.contains(".location-header", "Humboldt Forum").click();
    cy.url().should("include", "/locations/");
    cy.get(".location-photo")
      .should("have.attr", "src")
      .should(
        "eq",
        "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=Aaw_FcLPAHPEGsx1sZg7gOCrSG4ZsL5GmRNP2yiLLXpqSdqsC2n8-UBQKgztpxjlBBBANIO0p_HX6aYQdekfzPHdV39ZJaOxNtjeoBHMTmM7O9u9GYT8leRyrhcWoi5afSq_8xWoyvp3IbvHxMYr0SaP82H9WZCdHxD-vMcyVCmmb01hMAZn&key=***REMOVED***"
      );
    cy.contains(".location-header", "Humboldt Forum").should("be.visible");
    cy.contains(".rating", 4.4).should("be.visible");
    cy.contains(
      ".location-description",
      "The Humboldt Forum is a prominent cultural and museum complex situated in the heart of Berlin, Germany."
    ).should("be.visible");
  });
});
