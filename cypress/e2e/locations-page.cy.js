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
       {fixture: "googlePlaces.json"}
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
    });
  
    it("Loads the locations page, clicks link at top, returns to startup", () => {
      cy.visit("/locations");
      cy.get("#header-link").click();
      cy.contains("Startup").should("be.visible");
    });

    it("Loads the locations page, shows a location", () => {
        cy.visit("/locations");
        cy.wait(5000);
        //cy.contains()
        cy.contains("Horniman Museum and Gardens").should("be.visible");
      });
  
   
  });
  
  
  
  
  
  
  
  
  