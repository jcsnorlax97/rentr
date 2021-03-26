describe('Simple Search', function(){
    it('Find Search bar', function(){
        cy.visit('https://rentr-front-end.herokuapp.com/')
        cy.get('[id="headerSearchField"]')
            .click()
            .type('Justin')
            .should('have.value', 'Justin')
    })
    it('Click Search Button', function(){
        cy.get('[class="MuiButton-label"]')
            .contains('Search')
            .click()
        
    })

})