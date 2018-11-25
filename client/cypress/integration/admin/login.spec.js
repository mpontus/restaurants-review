describe("Admin login", () => {
  beforeEach(function () {
    cy.seed('admin-user').then(([seed]) => seed).as('auth');
  })

  beforeEach(function() {
    cy.login(this.auth.email, this.auth.password);
  })

  it("should be redirected to user management", () => {
    cy.url().should('be', '/users');
    cy.contains("User Management");
  })
})
