describe("replying to pending review", () => {
  beforeEach(function() {
    cy.seed("owner-user")
      .then(([seed]) => seed)
      .as("seed");
  });

  beforeEach(function() {
    cy.login(this.seed.email, this.seed.password);
  });

  it("should allow replying to review", function() {
    cy.getByText("Reviews").click();
    cy.getByText("Reply").click();

    cy.get("[role=dialog]").within(() => {
      cy.getByLabelText("Enter your reply").type("Ut amet est dolores.");
      cy.getByText("Reply to review").click();
    });

    cy.get("[role=dialog]").should("not.exist");
    cy.contains("Reply saved");
  });
});
