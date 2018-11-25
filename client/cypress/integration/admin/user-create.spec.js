describe("user creation", () => {
  beforeEach(function() {
    cy.seed("admin-user")
      .then(([seed]) => seed)
      .as("auth");
  });

  beforeEach(function() {
    cy.login(this.auth.email, this.auth.password);
  });

  beforeEach(function() {
    cy.contains("Create User").click();
  });

  describe("when values are valid", () => {
    describe("when creating user", () => {
      beforeEach(() => {
        cy.getByLabelText("User", "[type=checkbox]").click();
        cy.getByLabelText("Display Name").type("Theresa Brown");
        cy.getByLabelText("Email Address").type("ngallagher@cole-pearson.info");
        cy.getByLabelText("Password").type("_q*9s^Li$G");
        cy.getByText("Save User").click();
      });

      it("should create user", () => {
        cy.contains("User Theresa Brown created");
        cy.contains("User creation").should("not.exist");
      });
    });

    describe("when creating owner", () => {
      beforeEach(() => {
        cy.getByLabelText("Owner", "[type=checkbox]").click();
        cy.getByLabelText("Display Name").type("Theresa Brown");
        cy.getByLabelText("Email Address").type("ngallagher@cole-pearson.info");
        cy.getByLabelText("Password").type("_q*9s^Li$G");
        cy.getByText("Save User").click();
      });

      it("should create user", () => {
        cy.contains("User Theresa Brown created");
        cy.contains("User creation").should("not.exist");
      });
    });

    describe("when creating admin", () => {
      beforeEach(() => {
        cy.getByLabelText("Admin", "[type=checkbox]").click();
        cy.getByLabelText("Display Name").type("Theresa Brown");
        cy.getByLabelText("Email Address").type("ngallagher@cole-pearson.info");
        cy.getByLabelText("Password").type("_q*9s^Li$G");
        cy.getByText("Save User").click();
      });

      it("should create user", () => {
        cy.contains("User Theresa Brown created");
        cy.contains("User creation").should("not.exist");
      });
    });
  });
});
