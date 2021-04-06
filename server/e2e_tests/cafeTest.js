import {Selector} from 'testcafe';

fixture('testcafe Login')
    .page('https://rentr-front-end.herokuapp.com/');

test('Load Rentr', async t => {
    await t
        .click('[id="homePage_Header_Login"]')
        .typeText('[id="loginEmail"]', 'test123@gmail.com')
        .typeText('[id="loginPassword"]', 'test123')
        .click('#loginDialog > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root.homeDialog-Content > form > div.MuiDialogActions-root.homeDialog-Actions.MuiDialogActions-spacing > button.MuiButtonBase-root.MuiButton-root.MuiButton-text.homeDialog-normalButton > span.MuiButton-label')
        .wait(6000)

        .click('#homePage_Header_Login > span.MuiButton-label')
        .typeText('[id="title"]', 'Testcafe Listing')
        .typeText('[id="description"]', 'Testcafe Description')
        .click('[id="num_bedroom"]')
        .click('[data-value="2"]')
        .click('[id="num_bathroom"]')
        .click('[data-value="2"]')
        .typeText('[id="price"]', '607')
        .click('[id="is_laundry_available"]')
        .click('[data-value="true"]')
        .click('[id="is_pet_allowed"]')
        .click('[data-value="true"]')
        .click('[id="is_parking_available"]')
        .click('[data-value="true"]')
        // .click('body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root.homeDialog-Content > form > div.MuiDialogActions-root.createlistingDialog-Actions.MuiDialogActions-spacing > button > span.MuiButton-label')
        .wait(5000)

})