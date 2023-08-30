require('../../../support/Actions/Course')
export function GotoStudent() {
   // cy.openViewEditCourse()
    cy.gotoStudents()
}
export function AddStudent(students = [], option){
    cy.clickAddStudent()
    cy.addUser("Student", students, option)
}
export function DeleteStudent(students = [], option){
    cy.removeUser("Student", students, option)
}