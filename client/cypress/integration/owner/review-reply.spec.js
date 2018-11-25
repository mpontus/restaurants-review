describe("replying to pending review", () => {
  beforeEach(function() {
    cy.seed("owner-user")
      .then(([seed]) => seed)
      .as("seed");
  });

  beforeEach(function() {
    cy.login(this.seed.email, this.seed.password);
  });

  describe("from pending reviews page", () => {
    beforeEach(() => {
      cy.visit("/reviews");
    });

    it("should allow replying to review", function() {
      cy.getByText("Reply").click();

      cy.get("[role=dialog]").within(() => {
        cy.getByLabelText("Enter your reply").type("Ut amet est dolores.");
        cy.getByText("Reply to review").click();
      });

      cy.get("[role=dialog]").should("not.exist");
      cy.contains("Reply saved");
    });
  });

  describe("from pending reviews page", () => {
    beforeEach(function() {
      cy.visit(`/place/${this.seed.place.id}`);
    });

    it("should allow replying to review", function() {
      cy.getByText("Reply").click();

      cy.get("[role=dialog]").within(() => {
        cy.getByLabelText("Enter your reply").type("Ut amet est dolores.");
        cy.getByText("Reply to review").click();
      });

      cy.get("[role=dialog]").should("not.exist");
      cy.contains("Reply saved");
    });
  });
});
