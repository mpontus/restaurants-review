describe("user update", () => {
  beforeEach(() => {
    cy.seed("multiple-users,admin-user")
      .then(([userSeed, authSeed]) => ({
        users: userSeed.users,
        auth: authSeed
      }))
      .as("seed");
  });

  beforeEach(function() {
    cy.login(this.seed.auth.email, this.seed.auth.password);
  });

  beforeEach(function() {
    cy.getByLabelText(this.seed.users[0].name).within(() => {
      cy.getByLabelText("More Actions").click();
    });

    cy.getByText("Edit").click();
  });

  it("should allow admin to update user details", function() {
    // Form contains current details
    cy.getByLabelText("Display Name").should(
      "have.value",
      this.seed.users[0].name
    );
    cy.getByLabelText("Email Address").should(
      "have.value",
      this.seed.users[0].email
    );
    cy.getByLabelText("Password").should("have.value", "");
    cy.getByLabelText("User").should("be.checked", "");
    cy.getByLabelText("Owner").should("not.be.checked", "");
    cy.getByLabelText("Admin").should("not.be.checked", "");

    // Change some details
    cy.getByLabelText("Display Name").type("{selectall}Miss America Kemmer");
    cy.getByLabelText("Email Address").type("{selectall}Eda56@yahoo.com");
    cy.getByLabelText("Password").type("^u&Mt3&I52");
    cy.getByLabelText("Admin").click();
    cy.getByText("Save User").click();

    // Modal closed
    cy.contains("Update User").should("not", "exist");

    // Name updated
    cy.contains("Miss America Kemmer");
  });
});
