require('../../../support/Actions/Course')
export function GotoSectionAndMeetingTime() {
    cy.openViewEditCourse()
    cy.gotoSectionAndMeetingTime()
}
export function CreateNewSectionAndMeetingTime(name, location, url, daily, slot, option){
    cy.clickNewSectionAndMeetingTime()
    cy.addOrCancelSectionAndMeetingTime(name, location, url, daily, slot, option)
}
export function EditSectionAndMeetingTime(oldName, newName, location, url, daily, slot, option){
    cy.clickEditSectionAndMeetingTime(oldName)
    cy.EditSectionAndMeetingTime(newName, location, url, daily, slot, option)
}
export function DeleteSectionAndMeetingTime(name, option){
    cy.clickDeleteSectionAndMeetingTime(name)
    cy.DeleteSectionAndMeetingTime(option)  
}