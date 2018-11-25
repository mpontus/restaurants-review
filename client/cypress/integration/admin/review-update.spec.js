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
    cy.getByText("Edit").click();

    cy.get("[role=dialog]").within(() => {
      cy.getByLabelText("Comment").should(
        "have.value",
        this.seed.reviews[0].comment
      );

      cy.getByLabelText("2 stars").click();
      cy.getByLabelText("Comment").type(
        "{selectall}A molestiae illo animi ut."
      );
      cy.getByLabelText("Reply").type(
        "{selectall}Voluptatibus vel temporibus quas sint consequatur cum."
      );
      cy.getByText("Save Review").click();
    });

    cy.get("[role=dialog]").should("not.exist");
    cy.contains("Review saved");
  });
});
