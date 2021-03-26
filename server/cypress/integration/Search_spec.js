describe('Simple Single Result Search', function(){
    it('Find Search bar', function(){
        cy.visit('https://rentr-front-end.herokuapp.com/')
        cy.get('[id="headerSearchField"]')
            .click()
            .type('Super')
            .should('have.value', 'Super')
    })
    it('Click Search Button', function(){
        cy.get('[class="MuiButton-label"]')
            .contains('Search')
            .click()
        
    })
    it('Validate Search Results', function(){
        cy.get('[class="listingTitle"]')
            .should('contain', 'Super Secret Testing Listing')
    })

})

describe('Simple Multiple Results Search', function(){
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
    it('Validate Search Results', function(){
        cy.get('[class="listingTitle"]')
            .should('contain', ['Justin\'s Smoke Test Listing'])
            .should('contain', ['Justin Test 2'])
    })

})