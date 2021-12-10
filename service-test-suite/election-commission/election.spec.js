// <reference types="cypress" />

context('Tesing Election Commission UI', () => {
  beforeEach(()=>{
    cy.visit('http://10.10.0.10:30031')
  })

  it('Testing valid text in web-age',()=>{
    cy.visit('http://10.10.0.10:30031')
    cy.contains('Election Commission Admin Portal')
    cy.contains('Add your candidates for election of K8s distribution here')
    cy.contains("Candidate's Name")
    cy.contains("Candidate's Picture")
  })

  it('Testing the functionalities inside the web-page',()=>{
    cy.get("#candidateNameInput").type("RoostK8s")
    cy.get("#candidateImageUrlInput").type("https://content.roost.io/content/images/2021/05/Roost-3D-Metallic---Horizontal---Light-Silver.png")
    cy.contains("Submit").click()
    cy.intercept('POST', 'http://10.10.0.10:30080',{statusCode: 201})
    cy.contains("Candidate added succesfully!")
  })
})

context('Testing voter UI',() => {
  it('Testing voter UI',()=>{
    cy.visit('http://10.10.0.10:30030')
    cy.contains('RoostK8s').click()
  })
})
