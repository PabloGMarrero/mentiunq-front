/// <reference types="cypress" />

describe('votes', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/TEXT')
  })

  it('displays Formulario no encontrado! text when form does not exist', () => {
    cy.get('[data-cy="votes-view-text"]').should('have.length', 1)
    cy.get('[data-cy="votes-view-text"]').contains('Formulario no encontrado!')
  })

  it('displays Form when form exist', () => {

    const codeShare = "EXAMPLE";
    const response = {"data":{"status":"SUCCESS","message":"","payload":"{\"id\":11,\"question\":\"Multiple Choice\",\"isCurrent\":true,\"mentiOptions\":[{\"id\":12,\"name\":\"Opción 1\",\"score\":0},{\"id\":13,\"name\":\"Opción 2\",\"score\":0},{\"id\":14,\"name\":\"Opción 3\",\"score\":0}]}"},"status":200,"statusText":"","headers":{"cache-control":"no-cache, no-store, max-age=0, must-revalidate","content-type":"application/json","expires":"0","pragma":"no-cache"},"config":{"transitional":{"silentJSONParsing":true,"forcedJSONParsing":true,"clarifyTimeoutError":false},"transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"maxBodyLength":-1,"env":{"FormData":null},"headers":{"Accept":"application/json, text/plain, */*"},"method":"get","url":"http://localhost:8998/answer/form/ZGEYOTZK/question/current"},"request":{}}


    cy.intercept('GET', "/form/"+codeShare+"/question/current", {
      statusCode: 200,
      body:[response]
    })

    cy.get('[data-cy="votes-view-text"]').should('have.length', 1)
    cy.get('[data-cy="votes-view-text"]').not().contains('Formulario no encontrado!')
  })
})
