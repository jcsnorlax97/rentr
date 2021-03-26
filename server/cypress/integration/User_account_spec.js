describe('Wrong Email Login', function (){
    
    it('Find Login Button', function(){
        cy.visit('https://rentr-front-end.herokuapp.com/')
        cy.get('[id="homePage_Header_Login"]').should('contain','Log In').click()
    })
    it('Enter login info', function(){
        cy.get('[id="loginEmail"]')
            .click()
            .type('login249@gmail.com').should('have.value', 'login249@gmail.com')
        
        cy.get('[id="loginPassword"]')
            .click()
            .type('login249').should('have.value', 'login249')
    })
    it('Click Login', function(){
        cy.get('[class="MuiButton-label"] ')
            .contains('Login')
            .click()
    })
    it('Login Fails', function(){
        cy.get('[class="MuiAlert-message"]')
            .should('contain', 'This email has not been registered yet')
    })
})
describe('Register An Account', function (){
    
    it('Find Login Button', function(){
        cy.visit('https://rentr-front-end.herokuapp.com/')
        cy.get('[id="homePage_Header_Login"]').should('contain','Log In').click()
    })
    
    it('Click Dont Have An Account', function(){
        cy.get('[class="MuiButton-label"] ')
            .contains('Don\'t have an account?')
            .click()
    })

    it('Enter registration info', function(){
        cy.get('[id="registerEmail"]')
            .click()
            .type('login249@gmail.com').should('have.value', 'login249@gmail.com')
        
        cy.get('[id="registerPassword"]')
            .click()
            .type('login249').should('have.value', 'login249')
        cy.get('[id="registerPassword_confirmed"]')
            .click()
            .type('login249').should('have.value', 'login249')
    })
    
    it('Click Register', function(){
        cy.get('[class="MuiButton-label"] ')
            .contains('Register')
            .click()
    })
    
    it('Registered Successfully', function(){
        cy.get('[class="MuiAlert-message"]')
            .should('contain', 'Your account is registered successfully')
    })
})
describe('Correct Email Login', function (){
    
    it('Find Login Button', function(){
        cy.visit('https://rentr-front-end.herokuapp.com/')
        cy.get('[id="homePage_Header_Login"]').should('contain','Log In').click()
    })
    it('Enter login info', function(){
        cy.get('[id="loginEmail"]')
            .click()
            .type('login249@gmail.com').should('have.value', 'login249@gmail.com')
        
        cy.get('[id="loginPassword"]')
            .click()
            .type('login249').should('have.value', 'login249')
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
            .contains('Good morning')
    })
})