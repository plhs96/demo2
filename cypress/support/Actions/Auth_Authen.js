const InputMailPage = require('../../fixtures/Locators/Pages/Login/InputMail.json')
const InputPasswordPage = require('../../fixtures/Locators/Pages/Login/InputPassword.json')
const LoginPage = require('../../fixtures/Locators/Pages/Login/SubDomain.json')
const HeaderPage = require('../../fixtures/Locators/Bars/Header.json')
const ProfilePopup = require('../../fixtures/Locators/Popups/Profile.json')

/**
 * @memberof cy
 * @method InputMail
*/
Cypress.Commands.add('InputMail', (mail) => {
    if (mail != null) {
        cy.types([InputMailPage.txtEmail], [mail])
    }
    cy.xpath(InputMailPage.btnNext).eq(1).scrollIntoView().click()
})
/**
 * @memberof cy
 * @method InputPassword
*/
Cypress.Commands.add('InputPassword', (password) => {
    if (password != null) {
        cy.types([InputPasswordPage.txtPassword], [password])
        cy.log("=========================",password)
    }
    cy.clicks(InputPasswordPage.btnSignIn)
})
/**
 * @memberof cy
 * @method ChooseDomain
*/
Cypress.Commands.add('ChooseDomain', (domain) => {
    cy.wait(3*1000)
    cy.clicks("//*[text()='" + domain + "']")
})

/**
 * @memberof cy
 * @method Login
*/
Cypress.Commands.add('Login', (mail, password) => {
    cy.types([LoginPage.txtEmail, LoginPage.txtPassword], [mail, password])
    cy.clicks(LoginPage.btnLogin)
})
Cypress.Commands.add('Logout', () => {
    cy.clicks(HeaderPage.btnAvatar, ProfilePopup.btnLogout)
})

