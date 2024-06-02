// e2e test for the login page

describe('template spec', () => {
  // Attempt login
  it('login attempt', () => {
    cy.visit('/login')
    // Get an input, type into it and verify that the value has been updated
    cy.get('input[name=username]').type('admin')
    cy.get('input[name=password]').type('admin')

    // Get login button with name "login" and click it
    cy.get('button[name=login]').click()
  })

  // Click the register button
  it('register button', () => {
    cy.visit('/login')
    cy.get('button[name=register]').click()

    // Get an input, type into it and verify that the value has been updated
    cy.get('input[name=username]').type('admin')
    cy.get('input[name=password]').type('admin')
    cy.get('input[name=email]').type('admin@gmail.com')

    // Get register button with name "register" and click it
    cy.get('button[name=register]').click()
  })

  // Go from register to login
  it('login from register', () => {
    cy.visit('/register')
    cy.get('button[name=login]').click()
  })
})