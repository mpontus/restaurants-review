describe("user can sign up", () => {
  beforeEach(() => {
    cy.seed();

    cy.visit("/");

    cy.queryByText("Login").click();

    cy.contains("Log in with existing account");

    cy.queryByText("Sign Up").click();
  });

  describe("when details are valid", () => {
    beforeEach(() => {
      cy.get("#signup-name").type("Samantha Washington");
      cy.get("#signup-email").type("mitchell97@jones-smith.net");
      cy.get("#signup-password").type("FW9%!nRe$M{enter}");
    });

    it("should authenticate the user", () => {
      cy.contains("Logout");
    });
  });
});
