
Cypress.Commands.add('login', (email, password) =>
{
    cy.session([email, password], () =>
    {
        cy.request({
            method: 'POST',
            url: 'https://merchants.api.sandbox-utrust.com/api/session',
            body: { data: { type: "session", attributes: { email: email, password: password } } },
        }).then(({ body }) =>
        {
            window.localStorage.setItem('signInToken', body.data.attributes.token)
            window.localStorage.setItem('intercomUserHash', body.data.attributes.intercom_user_hash)
            window.localStorage.setItem('userEmail', email)
        })
        //alternative
        // cy.visit('https://merchants.sandbox-utrust.com/')
        // cy.get('#email')
        //     .type(email)
        // cy.get('#password')
        //     .type(password)
        // cy.get('#progress-status').click()
        // cy.url().should("contain", "/onboarding/get-started")
    })
})
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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })