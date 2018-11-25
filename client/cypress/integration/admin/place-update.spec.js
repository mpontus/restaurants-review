describe("admin can edit place", () => {
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

  it("should allow update", function() {
    cy.getByText("Edit Restaurant").click();

    cy.get("[role=dialog]").within(() => {
      cy.getByLabelText("Restaurant Name").should(
        "have.value",
        this.seed.places[0].title
      );
      cy.getByLabelText("Restaurant Address").should(
        "have.value",
        this.seed.places[0].address
      );

      cy.getByLabelText("Restaurant Name").type("{selectall}Bins and Sons");
      cy.getByLabelText("Restaurant Address").type(
        "{selectall}5464 VonRueden Alley"
      );
      cy.getByText("Save Restaurant").click();
    });

    cy.get("[role=dialog]").should("not.exist");
    cy.contains("Restaurant saved");
  });
});
