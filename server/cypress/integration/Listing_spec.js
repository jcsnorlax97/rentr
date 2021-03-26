describe('Correct Email Login', function (){
    
    it('Find Login Button', function(){
        cy.visit('https://rentr-front-end.herokuapp.com/')
        cy.get('[id="homePage_Header_Login"]').should('contain','Log In').click()
    })
    it('Enter login info', function(){
        cy.get('[id="loginEmail"]')
            .click()
            .type('login123@gmail.com').should('have.value', 'login123@gmail.com')
        
        
        cy.get('[id="loginPassword"]')
            .click()
            .type('login123').should('have.value', 'login123')
    })
    it('Click Login', function(){
        cy.get('[class="MuiButton-label"] ')
            .contains('Login')
            .click()
    })
    it('Login Works', function(){
        cy.get('[class="MuiAlert-message"]')
            .should('contain', 'Welcome home')

        cy.wait(6000)
        cy.get('[class="MuiButton-label"]')
            .contains('Good')
    })
})
describe('Add Listing', function(){
    it('Find Add Listing Button', function(){
        cy.get('[class="MuiButton-label"]')
            .contains('Add Listing')
            .click()
        
    })
    
    it('Enter Listing Info', function(){
        const listingTitle = 'Test Title A'
        const listingDesc = 'Test description lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum '
        const listingPrice = '687'

        cy.get('[id="title"]')
            .click()
            .type(listingTitle).should('have.value', listingTitle)
        
        cy.get('[id="description"]')
            .click()
            .type(listingDesc).should('have.value', listingDesc)
        
        cy.get('[id="num_bedroom"]')
            .click()
            cy.get('[data-value="2"]')
                .click()
        
        
        cy.get('[id="num_bathroom"]')
            .click()
            cy.get('[data-value="2"]')
                .click()

        cy.get('[id="price"]')
            .click()
            .type(listingPrice).should('have.value', listingPrice)
            
        cy.get('[id="is_laundry_available"]')
            .click()
            cy.get('[data-value="true"]')
                .click()

        
        cy.get('[id="is_pet_allowed"]')
            .click()
            cy.get('[data-value="true"]')
                .click()

        cy.get('[id="is_parking_available"]')
            .click()
            cy.get('[data-value="true"]')
                .click()
    
        cy.get('[class="MuiButton-label"]')
            .contains('Create')
            .click()
        
        cy.get('[class="MuiAlert-message"]')
            // .should('contain', 'Your posting is submitted successfully')

    })

    
})