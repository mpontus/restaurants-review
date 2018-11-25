describe("user can filter places by rating", () => {
  beforeEach(() => {
    cy.seed("multiple-places");

    cy.visit("/");

    cy.queryByLabelText("Filter by rating").within(() => {
      cy.queryByLabelText("2 stars").click();
    });
  });

  it("shows filtered places", () => {
    cy.contains("The Japanese Fence");
    cy.contains("Little China").should("not.exist");
  });

  describe("user can reset rating filter", () => {
    beforeEach(() => {
      cy.queryByLabelText("Filter by rating").click();
    });

    it("shows unfiltered places", () => {
      cy.contains("Little China");
      cy.contains("The Japanese Fence").should("not.exist");
    });
  });
});
