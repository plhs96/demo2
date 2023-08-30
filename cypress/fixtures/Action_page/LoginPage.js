require('../../support/Actions/Auth_Authen')
export function LoginPrmaryDomain(mail, domain, password) {

    cy.InputMail(mail)
    if (domain != null) {
        if (domain != 'Single') {
            cy.ChooseDomain(domain)
        }
        cy.wait(3 * 1000)
        cy.InputPassword(password)
    }
}

export function LoginSubDomain(email, password){
    cy.Login(email, password)
}