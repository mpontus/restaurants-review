describe("place creation", () => {
  beforeEach(function() {
    cy.seed("owner-user")
      .then(([seed]) => seed)
      .as("auth");
  });

  beforeEach(function() {
    cy.login(this.auth.email, this.auth.password);
  });

  it("should allow place creation", () => {
    cy.getByText("Create Restaurant").click();

    cy.get("[role=dialog]").within(() => {
      cy.getByLabelText("Restaurant Name").type(
        "MacGyver, Heidenreich and Gulgowski"
      );
      cy.getByLabelText("Restaurant Address").type("447 Deckow Shoal");

      cy.getByText("Save Restaurant").click();
    });

    // Modal is hidden
    cy.get("[role=dialog]").should("not.exist");
    cy.contains("Restaurant created");
  });
});
