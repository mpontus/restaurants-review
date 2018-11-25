describe("Navigation", () => {
  beforeEach(() => {
    cy.seed("owner-user", "admin-user")
      .then(([owner, admin]) => ({ owner, admin }))
      .as("seed");
  });

  describe("when user is an admin", () => {
    beforeEach(function() {
      cy.login(this.seed.admin.email, this.seed.admin.password);

      cy.getByText("Home").click();

      cy.url().should("be", "/");
    });

    it("should contain link to user management", () => {
      cy.getByText("Users").click();

      cy.url().should("be", "/users");

      cy.contains("User Management");
    });
  });

  describe("when user is an owner", () => {
    beforeEach(function() {
      cy.login(this.seed.owner.email, this.seed.owner.password);

      cy.getByText("Home").click();

      cy.url().should("be", "/");
    });

    it("should contain link to place management", () => {
      cy.getByText("Restaurants").click();

      cy.url().should("be", "/places");

      cy.contains("Restaurant Management");
    });

    it("should contain link to pending reviews", () => {
      cy.getByText("Reviews").click();

      cy.url().should("be", "/reviews");

      cy.contains("Pending Reviews");
    });
  });
});
