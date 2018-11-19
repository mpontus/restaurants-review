context("Sample Test", () => {
  it("should show default CRA page", () => {
    cy.visit("/");
    cy.contains("Learn React");
  });
});
