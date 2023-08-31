require('../../support/Actions/Autho_Authen')
const Link = require('../../fixtures/Datas/Link.json')
const Locator = require('../../fixtures/Locators/General.json')
const Data = require('../../fixtures/Datas/Login.json')
const { visitLink } = require('../../fixtures/Action_page/BasePage')
const { LoginPrmaryDomain } = require('../../fixtures/Action_page/LoginPage')
describe('Login General Domain Link', () => {
  beforeEach(()=>{
    visitLink(Link.domain)
  })
  it('Forward Link', () => { 
    cy.url().should('eq', 'https://signin.tabulalearning.net/login')
  })
  it('Sign In with accout belong multi domains', () => {
    Data['invalid-multi-domain'].forEach(element => {
      let mail = element.mail
      let messager = element.errorMessage
      let domain = element.domain
      cy.InputMail(mail)
      cy.wait(3000)
      cy.xpath("//*[text()='"+domain+"']/parent::*/parent::*/parent::*").invoke('attr', 'class').should('include', 'disabled')
      cy.xpath("//*[text()='"+messager+"']/parent::*/preceding-sibling::*//*[text()='"+domain+"']").should('have.length', 1)
      cy.clicks("//*[text()='arrow_back']/parent::*")
    })
    LoginPrmaryDomain(Data['valid-multi-domain'].mail, Data['valid-multi-domain'].domain, null)
    cy.checkExit(Locator.tagEqualOpen+Data['valid-multi-domain'].errorMessage[0]+Locator.tagEqualClose)
    cy.InputPassword(Data['valid-multi-domain'].invalidPassword)
    cy.checkExit(Locator.tagEqualOpen+Data['valid-multi-domain'].errorMessage[1]+Locator.tagEqualClose)
    cy.InputPassword(Data['valid-multi-domain'].password)
    cy.url().should('include', 'new_session=true')
  })
  it('Sign In with accout belong one domains', () => {
    Data['invalid-one-domain'].forEach(element => {
      let mail = element.mail
      let messager = element.errorMessage
      cy.InputMail(mail)
      cy.wait(3000)
      cy.checkExit(Locator.tagEqualOpen+messager+Locator.tagEqualClose)
    })
    LoginPrmaryDomain(Data['valid-one-domain'].mail, Data['valid-one-domain'].domain, Data['valid-one-domain'].password)
    cy.url().should('include', 'new_session=true')
  })
})
