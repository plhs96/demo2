const { visitLink } = require("../../fixtures/Action_page/BasePage")
const LoginData = require('../../fixtures/Datas/Login.json')
const Link = require('../../fixtures/Datas/Link.json')
const CourseData = require("../../fixtures/Datas/course.json")
const CourseAdministratorLocator = require('../../fixtures/Locators/Pages/Course/courseAdministrator.json')
const SectionAndMeetingTimeLocator = require('../../fixtures/Locators/Pages/Course/SectionAndMeetingTime.json')
const NewCoursePopupLocator = require('../../fixtures/Locators/Popups/Courses/NewCourse.json')
const NewSectionAndMeetingTimePopupLocator = require('../../fixtures/Locators/Popups/Courses/NewSectionAndMeetingTime.json')
const AddOrdEditPopupLocator = require('../../fixtures/Locators/Popups/Courses/AddOrEdit.json')

require('../../support/Actions/Course')
const { LoginPrmaryDomain, LoginSubDomain } = require("../../fixtures/Action_page/LoginPage")
const { SearchCourse, CreateCourse, ViewCourseDetail} = require("../../fixtures/Action_page/Courses/CourseAdministratorPage")
const { GotoTeacher, AddObserver, AddPrimaryTeacher, AddAssistantTeacher } = require("../../fixtures/Action_page/Courses/Teacher")
const { GotoSectionAndMeetingTime, CreateNewSectionAndMeetingTime, EditSectionAndMeetingTime, DeleteSectionAndMeetingTime } = require("../../fixtures/Action_page/Courses/SectionAndMeetingTime")
const { GotoStudent, AddStudent, DeleteStudent} = require("../../fixtures/Action_page/Courses/Student")
const { Logout } = require("../../fixtures/Action_page/ProfileMenu")
const { FilterSchoolYear, CheckMail } = require("../../fixtures/Action_page/Courses/Course")

let courseName = CourseData.course.name
if (courseName == null) {
  courseName = 'Course ' + Date.now()
} 
//const courseName = 'Course 1692857270719'
let sectionName = CourseData.section.name
if (sectionName == null) {
  sectionName = 'Section ' + Date.now()
} 


let students = [], observers = [], primaryTeachers = [], assistantTeachers =[]
for (let index = 0; index < CourseData.students.length; index++) {
  let element = CourseData.students[index].email
  students[index] = element
}
for (let index = 0; index < CourseData.teachers.observer.length; index++) {
  let element = CourseData.teachers.observer[index].email
  observers[index] = element
  
}
primaryTeachers[0] =CourseData.teachers.primary.email


for (let index = 0; index < CourseData.teachers.assistant.length; index++) {
  let element = CourseData.teachers.assistant[index].email
  assistantTeachers[index] = element
}
const timeGenerateCoureDate = 1.5 * 60 *1000
describe('Course Administrator', () => {

  beforeEach(() => {
    Cypress.on('uncaught:exception', (err) => {
      console.error('Uncaught exception:', err);
      return false;
    });
    visitLink(Link.domain)
    LoginPrmaryDomain(LoginData["course-admin"].mail, LoginData["course-admin"].domain, LoginData["course-admin"].password)
    SearchCourse(courseName)
  })
  it('Create Course Draft e2e', () => {
    cy.checkExit(CourseAdministratorLocator.iconNoRecord)
    CreateCourse()
    cy.checkLabel("This information is required.", 4)
    cy.xpath(NewCoursePopupLocator.btnCancel).click()
    cy.checkNoExit(NewCoursePopupLocator.popup)
    CreateCourse(courseName, '', '', 'Semester 2', '')
    cy.checkExit(CourseAdministratorLocator.iconNoRecord)
    CreateCourse(courseName, '', '', 'Semester 2')
    
    cy.checkNoExit(CourseAdministratorLocator.iconNoRecord)
  })
  it('Add Sections & Meeting times in Course Draft e2e', () => {
    GotoSectionAndMeetingTime()
    CreateNewSectionAndMeetingTime()
    cy.checkLabel("This information is required.", 3)
    cy.clicks(NewSectionAndMeetingTimePopupLocator.btnCancel)
    cy.checkNoExit(NewSectionAndMeetingTimePopupLocator.popup)
    CreateNewSectionAndMeetingTime(sectionName, null, null, '', '', '')
    cy.checkLabel(sectionName, 0)
    CreateNewSectionAndMeetingTime(sectionName, null, null, '', '')
    cy.checkLabel(sectionName, 1)
    cy.checkExit(SectionAndMeetingTimeLocator.progressbar)
    cy.wait(timeGenerateCoureDate)
    CreateNewSectionAndMeetingTime(sectionName, null, null, '', '')
    cy.checkLabel('This name already exists.', 1)
    cy.clicks(NewSectionAndMeetingTimePopupLocator.btnCancel)
  })

  it('Edit Sections & Meeting times in Course Draft e2e', () => {
    GotoSectionAndMeetingTime()
    EditSectionAndMeetingTime(sectionName, sectionName + " Edit", null, null, null, null, '')
    cy.checkLabel(sectionName, 1)
    cy.checkLabel(sectionName + " Edit", 0)
    EditSectionAndMeetingTime(sectionName, sectionName + " Edit")
    cy.checkLabel(sectionName, 0)
    cy.checkLabel(sectionName + " Edit", 1)
    cy.checkExit(SectionAndMeetingTimeLocator.progressbar)
    cy.wait(timeGenerateCoureDate)
  })
  it('Remove Sections & Meeting times in Course Draft e2e', () => {
    GotoSectionAndMeetingTime()
    DeleteSectionAndMeetingTime(sectionName + " Edit", '')
    cy.checkLabel(sectionName + " Edit", 1)
    DeleteSectionAndMeetingTime(sectionName + " Edit")
    cy.checkExit(SectionAndMeetingTimeLocator.progressbar)
    cy.wait(timeGenerateCoureDate)
    cy.checkLabel(sectionName + " Edit", 0)
  })
  it('Add Student in Course',()=>{
    GotoSectionAndMeetingTime()
    CreateNewSectionAndMeetingTime(sectionName, null, null, '', '')
    cy.wait(timeGenerateCoureDate)
    GotoStudent()
    cy.checkLabel('No data', 1)
    AddStudent(students, '')
    cy.checkLabel('No data', 1)
    AddStudent(students)
    cy.checkLabel('No data', 0)
    students.forEach(element => {
    cy.checkLabel(element, 1)
    })
    cy.clickAddStudent()
    students.forEach(element => {
      cy.searchUser(element)
      cy.checkLabel('No data', 1)
    });
  })
  it('Delete Student in Course',()=>{
    ViewCourseDetail()
    GotoStudent()
    students.forEach(element => {
      cy.checkLabel(element, 1)
      DeleteStudent(element, '')
      cy.checkLabel(element, 1)
      DeleteStudent(element)
      cy.checkLabel(element, 0)
      })
  })
  it('Add Observer Teacher in Course',()=>{
    ViewCourseDetail()
    GotoTeacher()
    AddObserver(observers)
    observers.forEach(element => {
      cy.checkLabel(element, 1)
    });
    cy.clickAddAssistantTeacher()
    observers.forEach(element =>{
      cy.searchUser(element)
      cy.checkLabel('No options', 1)
    })
  })
  it('Add Primary Teacher in Course',()=>{
    ViewCourseDetail()
    GotoTeacher()
    AddPrimaryTeacher(primaryTeachers)
    primaryTeachers.forEach(element => {
      cy.checkLabel(element, 1)
    });
    cy.clickAddObserver()
    primaryTeachers.forEach(element =>{
      cy.searchUser(element)
      cy.checkLabel('No options', 1)
    })
    cy.clicks(AddOrdEditPopupLocator.btnCancel)
    cy.clickAddAssistantTeacher()
    primaryTeachers.forEach(element =>{
      cy.searchUser(element)
      cy.checkLabel('No options', 1)
    })
    Logout()
    cy.wait(2*1000)
    LoginSubDomain(CourseData.teachers.primary.email, CourseData.teachers.primary.password)
    FilterSchoolYear(CourseData.course.schoolYear)
    cy.checkLabel(courseName, 1)
    primaryTeachers.forEach(element =>{
      CheckMail(element, courseName)
    })
  })

  it('Add Assistant Teacher in Course',()=>{
    ViewCourseDetail()
    GotoTeacher()
    AddAssistantTeacher(assistantTeachers)
    assistantTeachers.forEach(element => {
      cy.checkLabel(element, 1)
    })
    cy.clickAddObserver()
    assistantTeachers.forEach(element =>{
      cy.searchUser(element)
      cy.checkLabel('No options', 1)
    })
    for (let index = 0; index < CourseData.teachers.assistant.length; index++) {
      const element = CourseData.teachers.assistant[index];
      Logout()
      LoginSubDomain(element.email, element.password)
      FilterSchoolYear(CourseData.course.schoolYear)
      cy.checkLabel(courseName, 1)
    }
  })
})
