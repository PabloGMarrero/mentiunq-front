/// <reference types="cypress" />


describe('presentations', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/app')
  })

  it('displays emtpy list presentations', () => {
    cy.get('[data-cy="google-login"]').click()
  })
})
