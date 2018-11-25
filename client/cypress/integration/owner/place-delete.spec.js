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

      cy.getByText("Delete").click();

      cy.get("[role=dialog]").within(() => {
        cy.getByText("Delete Restaurant").click();
      });

      cy.get("[role=dialog]").should("not.exist");
      cy.contains("Restaurant deleted");
    });
  });

  describe("from place details", () => {
    beforeEach(function() {
      cy.visit(`/place/${this.seed.place.id}`);
    });

    it("should allow to delete a place", function() {
      cy.getByText("Delete Restaurant").click();

      cy.get("[role=dialog]").within(() => {
        cy.getByText("Delete Restaurant").click();
      });

      cy.get("[role=dialog]").should("not.exist");
      cy.contains("Restaurant deleted");
      cy.url().should("be", "/");
    });
  });
});
