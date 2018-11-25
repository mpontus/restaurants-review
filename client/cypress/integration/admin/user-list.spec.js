describe("user listing", () => {
  beforeEach(function() {
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

  it("should list users", function() {
    cy.contains(this.seed.users[0].name);
    cy.contains(this.seed.users[0].email);
    cy.contains(this.seed.users[1].name);
    cy.contains(this.seed.users[1].email);
  });

  describe("User can use pagination", function() {
    beforeEach(() => {
      cy.queryByText("Next").click();
    });

    it("shows extra users", function() {
      cy.contains(this.seed.users[this.seed.users.length - 1].name);
    });
  });
});
