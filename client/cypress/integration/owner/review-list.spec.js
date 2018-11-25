describe("listing pending reviews", () => {
  beforeEach(function() {
    cy.seed("owner-user")
      .then(([seed]) => seed)
      .as("seed");
  });

  beforeEach(function() {
    cy.login(this.seed.email, this.seed.password);
  });

  it("should display pending reviews", function() {
    cy.getByText("Reviews").click();

    cy.contains(this.seed.pendingReviews[0].comment);
    cy.contains(this.seed.answeredReviews[0].comment).should("not.exist");
  });
});
