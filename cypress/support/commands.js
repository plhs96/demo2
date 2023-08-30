Cypress.Commands.add('clicks', (... args) => { 
    for(let arg of args){
       cy.xpath(arg).scrollIntoView().click({force:true})
       cy.wait(1000)
    }
 })

 Cypress.Commands.add('clears', (... args) => { 
   for(let arg of args){
      cy.xpath(arg).clear()
   }
})

 Cypress.Commands.add('types', (locators = [], values = []) => { 
   for (let index = 0; index < locators.length; index++) {
      if (values[index] != null) {
         cy.clears(locators[index]).focus().type(values[index]) 
      }
   }
})

 Cypress.Commands.add('checkExit', (...locators) => { 
   locators.forEach(element => {
      cy.xpath(element).should('have.length', 1)
   });
})

Cypress.Commands.add('checkNoExit', (...locators) => { 
   locators.forEach(element => {
      cy.xpath(element).should('have.length', 0)
   });
})

Cypress.Commands.add('checkLabel', (content, times) => { 
   cy.xpath("//*[text()='"+content+"']").should('have.length', times)
})

