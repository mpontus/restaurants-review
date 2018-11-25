describe("admin can edit review", () => {
  beforeEach(() => {
    cy.seed("admin-user", "multiple-reviews")
      .then(([userSeed, reviewsSeed]) => ({
        auth: userSeed,
        place: reviewsSeed.place,
        reviews: reviewsSeed.reviews
      }))
      .as("seed");
  });

  beforeEach(function() {
    cy.login(this.seed.auth.email, this.seed.auth.password);
    cy.visit(`/place/${this.seed.place.id}`);
  });

  it("should allow update", function() {
    cy.getByText("Delete").click();

    cy.get("[role=dialog]").within(() => {
      cy.contains("Delete review?");
      cy.getByText("Delete Review").click();
    });

    cy.get("[role=dialog]").should("not.exist");
    cy.contains(/Review by .* deleted/);
  });
});
