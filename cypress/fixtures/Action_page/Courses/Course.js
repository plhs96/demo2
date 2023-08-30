require('../../../support/Actions/Course')
require('../../../support/Actions/Mails.js')
export function FilterSchoolYear(schoolyear){
    cy.filterSchoolYear(schoolyear)
}

export function CheckMail(mail, courseName){
    cy.checkYopMail(mail, courseName)
}
