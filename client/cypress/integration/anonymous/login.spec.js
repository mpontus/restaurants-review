describe("user can log in", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.queryByText("Login").click();

    cy.contains("Log in with existing account");

    cy.seed("regular-user")
      .then(([regularUser]) => regularUser)
      .as("seed");
  });

  describe("when details are valid", () => {
    beforeEach(function() {
      cy.get("#login-email").type(this.seed.email);
      cy.get("#login-password").type(`${this.seed.password}{enter}`);
    });

    it("should authenticate the user", () => {
      cy.contains("Logout");
    });
  });
});
