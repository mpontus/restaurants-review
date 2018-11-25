describe("own place listing", () => {
  beforeEach(function() {
    cy.seed("multiple-places", "owner-user")
      .then(([placesSeed, authSeed]) => ({
        auth1: authSeed,
        auth2: placesSeed.owner,
        places1: [authSeed.place],
        places2: placesSeed.places
      }))
      .as("seed");
  });

  it("shows each user their own places", function() {
    cy.login(this.seed.auth1.email, this.seed.auth1.password);
    cy.contains(this.seed.places1[0].title);
    cy.contains(this.seed.places2[0].title).should("not.exist");

    cy.logout();

    cy.login(this.seed.auth2.email, this.seed.auth2.password);
    cy.contains(this.seed.places2[0].title);
    cy.contains(this.seed.places1[0].title).should("not.exist");
  });
});
