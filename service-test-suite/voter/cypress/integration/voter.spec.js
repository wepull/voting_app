// sample_spec.js.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('My First Test', () => {
  it('Visits voter webpage', () => {
    cy.visit('http://vote-helm.voter.10.10.0.10.nip.io/')

  cy.intercept(
  {
    method: 'POST', // Route all POST requests
    url: '*ballot*', // that have a URL that matches '/users/*'
  }
).as('postresult')

cy.contains("Docker").click()

cy.wait('@postresult',{ responseTimeout: 35000 }).then((interception) => {

  assert.isNotNull(interception.response.body, '{code: 201, message: "Vote saved sucessfully"}')
})

// cy.reload()
// cy.contains("MiniKube").click()

cy.wait('@postresult',{ responseTimeout: 35000 }).then((interception) => {
  assert.isNotNull(interception.response.body, '{code: 201, message: "Vote saved sucessfully"}')
})
cy.reload()
cy.contains("Roost").click()

cy.wait('@postresult',{ responseTimeout: 35000 }).then((interception) => {
  assert.isNotNull(interception.response.body, '{code: 201, message: "Vote saved sucessfully"}')
})
cy.reload()
cy.contains("Rancher").click()

cy.wait('@postresult',{ responseTimeout: 35000 }).then((interception) => {
  assert.isNotNull(interception.response.body, '{code: 201, message: "Vote saved sucessfully"}')
})

cy.visit('http://vote-helm.voter.10.10.0.10.nip.io/voter/result')
cy.contains('Roost')
cy.contains('Docker')
//cy.contains('MiniKube')
cy.contains('Rancher')
  })
})
