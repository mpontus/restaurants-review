describe("owner login", () => {
  beforeEach(function() {
    cy.seed("owner-user")
      .then(([seed]) => seed)
      .as("auth");
  });

  beforeEach(function() {
    cy.login(this.auth.email, this.auth.password);
  });

  it("should be redirected to user management", () => {
    cy.url().should("be", "/places");
    cy.contains("Restaurant Management");
  });
});
