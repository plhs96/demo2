require('../../../support/Actions/Course')

export function CreateCourse(name, subject, schoolyear, term, option) {
    cy.clickNewCourse()
    cy.createOrCancelCourse(name, subject, schoolyear, term, option)
    if (name != null && subject != null && schoolyear != null && term != null && option == null) {
        cy.backAllCourseFromInfo()
    }
}
export function SearchCourse(name, schoolyear, status) {
    cy.searchCourse(name, schoolyear, status)
    cy.wait(3000)
}

export function ViewCourseDetail() {
    cy.openViewEditCourse()
}
