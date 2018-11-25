describe("user can see place details", () => {
  beforeEach(() => {
    cy.seed("multiple-reviews");

    cy.visit("/");

    cy.contains("The Exhibit").click();
  });

  it("shows place details", () => {
    cy.getByLabelText("Highest Review").within(() => {
      cy.contains("Dr. Rubye Grant");
      cy.contains("12/03/1986");
      cy.contains("Iure laborum earum et.");
      cy.contains("Rating: 5");
    });

    cy.getByLabelText("Lowest Review").within(() => {
      cy.contains("Justine Goyette");
      cy.contains("18/01/2009");
      cy.contains("Ea ipsa et voluptate nesciunt quas.");
      cy.contains("Rating: 1");
    });

    cy.getByLabelText("Other Reviews").within(() => {
      cy.contains("Hilma Johnson");
      cy.contains("18/01/2009");
      cy.contains(
        "Distinctio voluptas aliquid vitae et harum et voluptatem nostrum."
      );
      cy.contains("Rating: 2");
    });
  });

  describe("user can paginate through reviews", () => {
    beforeEach(() => {
      cy.queryByText("Next").click();
    });

    it("should show next review page", () => {
      cy.contains("Vidal Sipes");
      cy.contains("22/02/1979");
      cy.contains(
        "Reprehenderit aut reprehenderit mollitia mollitia asperiores molestiae."
      );
      cy.contains("Rating: 2");
    });
  });

  describe("user can return to the front page", () => {
    beforeEach(() => {
      cy.contains("Restaurant Reviews")
        .scrollIntoView()
        .click({ force: true });
    });

    it("should forward the user to front page", () => {
      cy.url().should("be", "/");
    });
  });
});
