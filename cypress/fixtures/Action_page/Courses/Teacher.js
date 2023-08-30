require('../../../support/Actions/Course')
export function GotoTeacher() {
    cy.gotoTeachers()
}
export function AddObserver(observers) {
    cy.addUser("Observer", observers, null)
}

export function AddPrimaryTeacher(primaryTeachers) {
    cy.addUser("Primary teacher", primaryTeachers, null)
}
export function AddAssistantTeacher(assistantTeachers) {
    cy.addUser("Assistant teacher", assistantTeachers, null)
}