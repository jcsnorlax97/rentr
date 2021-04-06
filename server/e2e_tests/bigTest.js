//I don't know how to split tests up so that they can be run one before the othert
// so hooking a whole bunch of stuff together for now. 

import {Selector} from 'testcafe';

fixture('Testing many features (creation, search, deletion)')
    .page('https://rentr-front-end.herokuapp.com/');

test('Testing login, creation, search, deletion', async t => {
    await t
        .click('[id="homePage_Header_Login"]')
        .typeText('[id="loginEmail"]', 'test123@gmail.com')
        .typeText('[id="loginPassword"]', 'test123')
        .click('#loginDialog > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root.homeDialog-Content > form > div.MuiDialogActions-root.homeDialog-Actions.MuiDialogActions-spacing > button.MuiButtonBase-root.MuiButton-root.MuiButton-text.homeDialog-normalButton > span.MuiButton-label')
        .wait(6000)

        
        .click('#homePage_Header_Login > span.MuiButton-label')
        // we should probably include some sort of image upload here. 
        .typeText('[id="title"]', 'Test 1 Test 1 Test 1')
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
        
        .click('body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root.homeDialog-Content > form > div.MuiDialogActions-root.createlistingDialog-Actions.MuiDialogActions-spacing > button > span.MuiButton-label')
        .wait(5000)



        .click('#homePage_Header > div > button > span.MuiButton-label > svg')
        .click('body > div.MuiPopover-root > div.MuiPaper-root.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded > div > ul > div > li > div.MuiListItemIcon-root > svg')
        //before deleting, we should verify that all the information there is present. 
        .wait(5000)
        .setNativeDialogHandler(() => true)
        .click('body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root > div > div.removeListingButton > button')
        .wait(1000)
        


        // .click('body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root.homeDialog-Content > form > div.MuiDialogActions-root.createlistingDialog-Actions.MuiDialogActions-spacing > button > span.MuiButton-label')
        .wait(500)

})