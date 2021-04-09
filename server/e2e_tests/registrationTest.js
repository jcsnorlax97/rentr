import {Selector} from 'testcafe';

fixture('Rentr Register New Acc')
    .page('https://rentr-front-end.herokuapp.com/');

test('Login Fails', async t => {

    const email = 'register@test.com'
    const password = 'register'

    await t
        .maximizeWindow()
        .click('[id="homePage_Header_Login"]')
        .typeText('[id="loginEmail"]', email)
        .typeText('[id="loginPassword"]', password)
        .click('#loginDialog > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root.homeDialog-Content > form > div.MuiDialogActions-root.homeDialog-Actions.MuiDialogActions-spacing > button.MuiButtonBase-root.MuiButton-root.MuiButton-text.homeDialog-normalButton > span.MuiButton-label')
        .expect(Selector('div > div > div.MuiAlert-message').textContent).notContains('Welcome', Selector('div > div > div.MuiAlert-message').textContent)
        .wait(6000)

})