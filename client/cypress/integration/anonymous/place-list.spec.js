describe("user can see places", () => {
  beforeEach(() => {
    cy.seed("multiple-places");

    cy.visit("/");
  });

  it("shows place details", () => {
    cy.contains("Little China");
    cy.contains("1915 Uzma Court");
    cy.contains("Rating: 4.61");
  });

  describe("user can open place details", () => {
    beforeEach(() => {
      cy.contains("Little China").click();
    });

    it("opens place details", () => {
      cy.url().should("include", "/place/6bf9374f-8abc-5942-b52e-fff076137298");
    });
  });

  describe("User can use pagination", () => {
    beforeEach(() => {
      cy.queryByText("Next").click();
    });

    it("Shows extra places", () => {
      cy.contains("The Dairy Laguna");
    });
  });
});
