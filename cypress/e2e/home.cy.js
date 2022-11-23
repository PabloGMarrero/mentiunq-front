/// <reference types="cypress" />

describe('home', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('displays one google login button', () => {
    cy.get('[data-cy="google-login"]').should('have.length', 1)
    cy.get('[data-cy="google-login"]').contains('Login')
  })

  it('displays one top nav bar', () => {
    cy.get('[data-cy="top-navbar"]').should('have.length', 1)
  })

  it('have one home view', () => {
    cy.get('[data-cy="home-view"]').should('have.length', 1) 
  })

  it('text when is not logged', () => {
    cy.get('[data-cy="home-view-text-not-logged"]').should('have.length', 1)
    cy.get('[data-cy="home-view-text-not-logged"]').contains('Logueate para comenzar a crear tus presentaciones!') 
  })

  it('text when is logged', () => {
    cy.loginByGoogleApi()
    cy.get('[data-cy="google-login"]').click()
    cy.get('[data-cy="home-view-text-not-logged"]').should('have.length', 1)
    cy.get('[data-cy="home-view-text-not-logged"]').contains('Logueate para comenzar a crear tus presentaciones!') 
  })

})
