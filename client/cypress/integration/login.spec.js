describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.queryByText("Login").click();

    cy.seed("regular-user")
      .then(([regularUser]) => ({ regularUser }))
      .as("seed");
  });

  it("authenticates the user", function() {
    cy.queryByLabelText("Email").type(this.seed.regularUser.email);
    cy.queryByLabelText("Password").type(this.seed.regularUser.password);
    cy.queryByText("Login").click();

    cy.get("header").within(() => {
      cy.getByText(this.seed[0].name).should("exist");
    });
  });
});
