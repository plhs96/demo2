
const CourseAdministratorPageLocator = require('../../fixtures/Locators/Pages/Course/courseAdministrator.json')
const SectionAndMeetingTimePageLocator = require('../../fixtures/Locators/Pages/Course/SectionAndMeetingTime.json')
const CourseInfoPageLocator = require('../../fixtures/Locators/Pages/Course/CourseInfo.json')
const NewCoursePopupLocator = require('../../fixtures/Locators/Popups/Courses/NewCourse.json')
const OptionMenuPopupLocator = require('../../fixtures/Locators/Popups/Courses/Option.json')
const CourseInfoBarLocator = require('../../fixtures/Locators/Bars/Courses/CourseInfo.json')
const NewSectionAndMeetingTimePopupLocator = require('../../fixtures/Locators/Popups/Courses/NewSectionAndMeetingTime.json')
const StudentLocator = require('../../fixtures/Locators/Pages/Course/student.json')
const TeacherLocator = require('../../fixtures/Locators/Pages/Course/teacher.json')
const ConfirmPopupLocator = require('../../fixtures/Locators/Popups/Courses/confirmation.json')
const AddOrEditPopupLocator = require('../../fixtures/Locators/Popups/Courses/AddOrEdit.json')
const CoursePageLocator = require('../../fixtures/Locators/Pages/Course/Course.json')
/**
 * @memberof cy
 * @method clickNewCourse, createCourse
*/

Cypress.Commands.add('clickNewCourse', () => {
    cy.clicks(CourseAdministratorPageLocator.btnNew)
})

Cypress.Commands.add('backAllCourseFromInfo', () => {
    cy.clicks(CourseInfoPageLocator.btnBack)
})

Cypress.Commands.add('createOrCancelCourse', (name, subject, schoolyear, terms, option) => {
    if (name != null) {
        cy.types([NewCoursePopupLocator.txtName], [name])
    }
    if (subject != null) {
        cy.clicks(NewCoursePopupLocator.txtSubject)
        if (subject == '') {
            cy.xpath("//ul[@role='listbox']/div").eq(0).scrollIntoView().click({ force: true })
        }
        else {
            cy.clicks('//ul//*[text()="' + subject + '"]')
        }
    }
    if (schoolyear != null) {
        cy.clicks(NewCoursePopupLocator.txtSchoolYear)
        if (schoolyear == '') {
            cy.xpath("//ul[@role='listbox']/div").eq(0).scrollIntoView().click({ force: true })
        }
        else {
            cy.clicks('//ul//*[text()="' + schoolyear + '"]')
        }
    }
    if (terms != null) {
        cy.clicks(NewCoursePopupLocator.txtTerms)
        if (terms == '') {
            cy.xpath("//ul[@role='listbox']/div").eq(0).scrollIntoView().click({ force: true })
        }
        else {
            cy.clicks('//ul//*[text()="' + terms + '"]')
        }
    }
    if (option == null) {
        cy.clicks(NewCoursePopupLocator.btnCreate)
    }
    else {
        cy.clicks(NewCoursePopupLocator.btnCancel)
    }
})
Cypress.Commands.add('searchCourse', (name, schoolyear, status) => {
    if (name != null) {
        cy.types([CourseAdministratorPageLocator.txtCourseName], [name])
    }
    if (schoolyear != null) {
        cy.xpath(CourseAdministratorPageLocator.listbox).eq(0).scrollIntoView().click({ force: true })
        cy.clicks('//ul//*[text()="' + schoolyear + '"]')
    }
    if (status != null) {
        cy.xpath(CourseAdministratorPageLocator.listbox).eq(1).scrollIntoView().click({ force: true })
        cy.clicks('//ul//*[text()="' + status + '"]')
    }

})

Cypress.Commands.add('openViewEditCourse', () => {
    cy.clicks(CourseAdministratorPageLocator.btnOption, OptionMenuPopupLocator.btnViewEdit)
})
Cypress.Commands.add('gotoSectionAndMeetingTime', () => {
    cy.clicks(CourseInfoBarLocator.tbSectionMeetingTime)
})
Cypress.Commands.add('gotoStudents', () => {
    cy.clicks(CourseInfoBarLocator.tbStudent)
})

Cypress.Commands.add('gotoTeachers', () => {
    cy.clicks(CourseInfoBarLocator.tbTeacher)
})


Cypress.Commands.add('clickNewSectionAndMeetingTime', () => {
    cy.clicks(SectionAndMeetingTimePageLocator.btnNew)
})

Cypress.Commands.add('clickEditSectionAndMeetingTime', (name) => {
    cy.clicks("//*[text()='" + name + "']/parent::*" + SectionAndMeetingTimePageLocator.btnEdit)
})
Cypress.Commands.add('clickDeleteSectionAndMeetingTime', (name) => {
    cy.clicks("//*[text()='" + name + "']/parent::*" + SectionAndMeetingTimePageLocator.btnRemove)
})
Cypress.Commands.add('addOrCancelSectionAndMeetingTime', (name, location, url, daily, slot, option) => {
    cy.log('==================', name)
    if (name != null) {
        cy.types([NewSectionAndMeetingTimePopupLocator.txtSectionName], [name])
    }
    if (location != null) {
        cy.types([NewSectionAndMeetingTimePopupLocator.txtLocation], [location])
    }
    if (url != null) {
        cy.types([NewSectionAndMeetingTimePopupLocator.txtUrl], [url])
    }
    if (daily != null) {
        cy.clicks(NewSectionAndMeetingTimePopupLocator.txtDaily)
        if (daily == '') {
            cy.xpath("//ul/div[@role='option']").eq(0).click()
        } else {
            cy.clicks("//*[text()='" + daily + "']")
        }
    }
    if (slot != null) {
        cy.clicks(NewSectionAndMeetingTimePopupLocator.txtSlot)
        if (daily == '') {
            cy.xpath("//ul/div[@role='option']").eq(0).click()
        } else {
            cy.clicks("//*[contains(text(),'" + daily + ")']")
        }
    }
    if (option == null) {
        cy.clicks(NewSectionAndMeetingTimePopupLocator.btnSave)
    } else {
        cy.clicks(NewSectionAndMeetingTimePopupLocator.btnCancel)
    }

})

Cypress.Commands.add('EditSectionAndMeetingTime', (name, location, url, daily, slot, option) => {
    cy.log('==================', name)
    if (name != null) {
        cy.types([NewSectionAndMeetingTimePopupLocator.txtSectionName], [name])
    }
    if (location != null) {
        cy.types([NewSectionAndMeetingTimePopupLocator.txtLocation], [location])
    }
    if (url != null) {
        cy.types([NewSectionAndMeetingTimePopupLocator.txtUrl], [url])
    }
    if (daily != null) {
        cy.clicks(NewSectionAndMeetingTimePopupLocator.txtDaily)
        if (daily == '') {
            cy.xpath("//ul/div[@role='option']").eq(0).click()
        } else {
            cy.clicks("//*[text()='" + daily + "']")
        }
    }
    if (slot != null) {
        cy.clicks(NewSectionAndMeetingTimePopupLocator.txtSlot)
        if (daily == '') {
            cy.xpath("//ul/div[@role='option']").eq(0).click()
        } else {
            cy.clicks("//*[contains(text(),'" + daily + ")']")
        }
    }
    if (option == null) {
        cy.clicks(NewSectionAndMeetingTimePopupLocator.btnSave)
    } else {
        cy.clicks(NewSectionAndMeetingTimePopupLocator.btnCancel)
    }

})
Cypress.Commands.add('DeleteSectionAndMeetingTime', (option) => {
    if (option == null) {
        cy.clicks(ConfirmPopupLocator.popup + ConfirmPopupLocator.btnRemove)
    } else {
        cy.clicks(ConfirmPopupLocator.btnCancel)
    }
})

Cypress.Commands.add('clickAddStudent', () => {
    cy.clicks(StudentLocator.btnAddStudent)
})
Cypress.Commands.add('clickAddPrimaryTeacher', () => {
    cy.clicks(TeacherLocator.btnAddPrimaryTeacher)
})
Cypress.Commands.add('clickAddAssistantTeacher', () => {
    cy.clicks(TeacherLocator.btnAddAssistantTeacher)
})
Cypress.Commands.add('clickAddObserver', () => {
    cy.clicks(TeacherLocator.btnaddObserver)
})

Cypress.Commands.add('searchUser', (mail) => {
    cy.types([AddOrEditPopupLocator.txtSearch], [mail])
})


Cypress.Commands.add('removeUser', (type, email, option) => {
    if (type == 'Student') {
        cy.clicks("//*[text()='" + email + "']/ancestor::tr/td[last()]//button", OptionMenuPopupLocator.btnRemove)
    } if (type == 'Teacher') {
        cy.clicks("//*[text()='" + email + "']/ancestor::li//button")
    }
    if (option == null) {
        cy.clicks(ConfirmPopupLocator.btnRemove)
    } else {
        cy.clicks(ConfirmPopupLocator.btnCancel)
    }
})


Cypress.Commands.add('addUser', (type, emails = [], option) => {
    switch (type) {
        case "Student":
            cy.clickAddStudent()
            break;
        case "Primary teacher":
            cy.clickAddPrimaryTeacher()
            break;
        case "Assistant teacher":
            cy.clickAddAssistantTeacher()
            break;
        case "Observer":
            cy.clickAddObserver()
            break;
    }
    //if (emails != null) {
        emails.forEach(element => {
            cy.searchUser(element)
            cy.clicks("//*[text()= '"+element+"']/parent::*/parent::*")
        });
    // }
    // else {
    //     cy.clicks(AddOrEditPopupLocator.txtSearch)
    //     cy.xpath(AddOrEditPopupLocator.txtFirstElement).eq(1).scrollIntoView().click()
    // }

    if (option == null) {
        cy.clicks(AddOrEditPopupLocator.btnAdd)
    } else {
        cy.clicks(AddOrEditPopupLocator.btnCancel)
    }
})

Cypress.Commands.add('filterSchoolYear', (schoolyear) =>{
    cy.clicks(CoursePageLocator.btnSetupRequire, CoursePageLocator.ddSchoolYear,"//li[text()='"+schoolyear+"']")
})
