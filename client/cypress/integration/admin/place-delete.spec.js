describe("admin can delete a place", () => {
  beforeEach(() => {
    cy.seed("admin-user", "multiple-places")
      .then(([userSeed, placesSeed]) => ({
        auth: userSeed,
        places: placesSeed.places
      }))
      .as("seed");
  });

  beforeEach(function() {
    cy.login(this.seed.auth.email, this.seed.auth.password);
    cy.visit(`/place/${this.seed.places[0].id}`);
  });

  it("should allow delete", function() {
    cy.getByText("Delete Restaurant").click();

    cy.get("[role=dialog]").within(() => {
      cy.getByText("Delete Restaurant").click();
    });

    cy.get("[role=dialog]").should("not.exist");
    cy.contains("Restaurant deleted");
    cy.url().should("be", "/");
  });
});
