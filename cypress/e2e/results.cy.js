/// <reference types="cypress" />


describe('results', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/app/results/')
  })

  it('displays emtpy list presentations', () => {
    cy.get('[data-cy="google-login"]').click()
  })
})
