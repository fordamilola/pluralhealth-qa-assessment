class LoginPage {
  visit() {
    cy.visit("https://www.saucedemo.com", {
      timeout: 300000,
      failOnStatusCode: false,
    });
    cy.get('[data-test="username"]', { timeout: 30000 }).should("be.visible");
  }

  login(username, password) {
    cy.get('[data-test="username"]').clear().type(username);
    cy.get('[data-test="password"]').clear().type(password, { log: false });
    cy.get('[data-test="login-button"]').click();
  }
}

export default new LoginPage();