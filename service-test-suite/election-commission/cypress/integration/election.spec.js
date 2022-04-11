const { expect } = require("chai")

describe('Testing Election Commission Webpage', () => {

  it('Testing valid text in web-page',()=> {
    cy.visit('http://default.ec.10.10.0.10.nip.io/')
   
    cy.contains('Election Commission Admin Portal')
    cy.contains("Add Candidate").should('be.visible').click()
    cy.contains('Add your candidates for election of K8s distribution here')
    cy.contains("Candidate's Name")
    cy.contains("Candidate's Picture")
  })

  it('Testing adding the candidate in web-page',()=>{
    cy.visit('http://default.ec.10.10.0.10.nip.io/')

    cy.intercept(
      {
        method: 'POST', 
        url: '*ecserver*', 
      }
    ).as('postresult')  

    cy.contains("Add Candidate").click()
    cy.get("#candidateNameInput").type("RoostK8s")
    cy.get("#candidateImageUrlInput").type("https://content.roost.io/content/images/2021/05/Roost-3D-Metallic---Horizontal---Light-Silver.png")
    cy.contains("Submit").should('be.visible').click()

    cy.wait('@postresult',{ responseTimeout: 35000 }).then((interception) => {

      assert.isNotNull(interception.response.body, '{code: 201 }')
    })
  })

  it('Testing deleting the candidate in web-page',()=>{

    cy.visit('http://default.ec.10.10.0.10.nip.io/')
    cy.intercept(
      {
        method: 'DELETE',
        url: '*ecserver*', 
      }
    ).as('deleteresult')   
    cy.contains("Delete").click()
    cy.wait('@deleteresult',{ responseTimeout: 35000 }).then((interception) => {

      assert.isNotNull(interception.response.body, '{code: 201}')
    })
  })

  it('Testing add/delete of candidates in backend',()=>{

    let candidatesSize 
    cy.request('http://default.ecserver.10.10.0.10.nip.io/').then((resp)=>{
      candidatesSize = resp.body.Candidates.length
    })

    if(candidatesSize) {
      cy.visit('http://default.ec.10.10.0.10.nip.io/')
      cy.contains("Delete").click()
      cy.request('http://default.ecserver.10.10.0.10.nip.io/').then((resp)=>{
  
        expect(resp.body.Candidates.length).to.equal(candidatesSize-1)
      })
    }
    else {
      cy.contains('No Candidates').should('be.visible')
    }

  })

})
