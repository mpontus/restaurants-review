describe("user can submit review", () => {
  beforeEach(() => {
    cy.seed("regular-user", "multiple-places")
      .then(([userSeed, placesSeed]) => ({
        auth: userSeed,
        places: placesSeed.places
      }))
      .as("seed");
  });

  beforeEach(function() {
    cy.login(this.seed.auth.email, this.seed.auth.password);
  });

  it("should allow user to create review", function() {
    cy.visit(`/place/${this.seed.places[0].id}`);
    cy.getByText("Submit Review").click();

    cy.get("[role=dialog]").within(() => {
      cy.getByLabelText("4 stars").click();
      cy.getByLabelText("Comment").type("Great place!");
      cy.getByText("Submit Review").click();
    });

    cy.get("[role=dialog]").should("not.exist");
    cy.contains("Thank you for your review!");
    cy.contains("Great place!");
  });
});
