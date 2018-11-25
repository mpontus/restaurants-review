describe("admin can delete a place", () => {
  beforeEach(() => {
    cy.seed("owner-user")
      .then(([seed]) => seed)
      .as("seed");
  });

  beforeEach(function() {
    cy.login(this.seed.email, this.seed.password);
  });

  describe("from own places", () => {
    beforeEach(function() {
      cy.visit(`/places`);
    });

    it("should allow to delete a place", function() {
      cy.getByLabelText(this.seed.place.title).within(() => {
        cy.getByLabelText("More Actions").click();
      });

      cy.getByText("Edit").click();

      cy.get("[role=dialog]").within(() => {
        cy.getByLabelText("Restaurant Name").should(
          "have.value",
          this.seed.place.title
        );
        cy.getByLabelText("Restaurant Address").should(
          "have.value",
          this.seed.place.address
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

  describe("from place details", () => {
    beforeEach(function() {
      cy.visit(`/place/${this.seed.place.id}`);
    });

    it("should allow to delete a place", function() {
      cy.getByText("Edit Restaurant").click();

      cy.get("[role=dialog]").within(() => {
        cy.getByLabelText("Restaurant Name").should(
          "have.value",
          this.seed.place.title
        );
        cy.getByLabelText("Restaurant Address").should(
          "have.value",
          this.seed.place.address
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
});
