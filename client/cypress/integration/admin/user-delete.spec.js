describe("user deletion", () => {
  beforeEach(() => {
    cy.seed("multiple-users,admin-user")
      .then(([userSeed, authSeed]) => ({
        users: userSeed.users,
        auth: authSeed
      }))
      .as("seed");
  });

  beforeEach(function() {
    cy.login(this.seed.auth.email, this.seed.auth.password);
  });

  it("should allow admin to delete a user", function() {
    cy.getByLabelText(this.seed.users[0].name).within(() => {
      cy.getByLabelText("More Actions").click();
    });

    cy.getByText("Delete").click();

    cy.contains("Delete user?");

    cy.getByText("Delete user").click();

    cy.contains(`User ${this.seed.users[0].name} deleted`);
    cy.contains(this.seed.users[0].name).should("not.exist");
  });
});
