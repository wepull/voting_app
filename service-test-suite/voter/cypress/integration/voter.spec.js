const { expect, assert } = require("chai")
const { it } = require("mocha")

describe('Checking Voter Webpage ', () => {
  
  it('Visits voter webpage', () => {
    cy.visit('http://default.voter.10.10.0.10.nip.io/') // Ingress Endpoint

    cy.intercept(
      {
        method: 'POST', 
        url: '*ballot*', 
      }
    ).as('postresult')
    

    cy.contains('Docker')
    .should('be.visible')
    .click()

    cy.get('.selectedCard')
    .should('be.visible')

    cy.wait('@postresult',{ responseTimeout: 5000 }).then((interception) => {
      assert.isNotNull(interception.response.body, '{code: 201, message: "Vote saved sucessfully"}')
    })

    cy.reload()

    cy.contains("Roost")
    .should('be.visible')
    .click()

    cy.get('.selectedCard')
    .should('be.visible')

    cy.wait('@postresult',{ responseTimeout: 5000 }).then((interception) => {
      assert.isNotNull(interception.response.body, '{code: 201, message: "Vote saved sucessfully"}')
    })

    cy.reload()

    cy.contains("Rancher")
    .should('be.visible')
    .click()

    cy.get('.selectedCard')
    .should('be.visible')

    cy.wait('@postresult',{ responseTimeout: 5000 }).then((interception) => {
      assert.isNotNull(interception.response.body, '{code: 201, message: "Vote saved sucessfully"}')
    })

    cy.contains('Show Results')
    .click()

    cy.url()
    .should('be.equal','http://default.voter.10.10.0.10.nip.io/voter/result')

    cy.contains('Roost').should('be.visible')
    cy.contains('Docker').should('be.visible')
    cy.contains('Rancher').should('be.visible')
  
  })

})
