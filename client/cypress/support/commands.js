// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import "cypress-testing-library/add-commands";

Cypress.Commands.add("seed", (...seeds) => {
  const apiUrl = Cypress.env("API_URL");

  return cy
    .request(`${apiUrl}/seed?seeds=${seeds.join(",")}`)
    .then(({ body }) => body);
});

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/");
  cy.contains("Login").click();
  cy.get("#login-email").type(email);
  cy.get("#login-password").type(password);
  cy.contains("[type=submit]", "Login").click();
});
