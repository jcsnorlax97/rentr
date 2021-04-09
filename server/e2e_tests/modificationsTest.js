import {Selector} from 'testcafe';

fixture('Modify a listing (Update and edit availability)').page(
  'https://rentr-front-end.herokuapp.com/'
);

test('Update test', async t => {
    await t
        .click('[id="homePage_Header_Login"]')
        .typeText('[id="loginEmail"]', 'demo@gmail.com')
        .typeText('[id="loginPassword"]', 'test123')
        .click('#loginDialog > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root.homeDialog-Content > form > div.MuiDialogActions-root.homeDialog-Actions.MuiDialogActions-spacing > button.MuiButtonBase-root.MuiButton-root.MuiButton-text.homeDialog-normalButton > span.MuiButton-label')
        .wait(500)

        .click('#homePage_Header > div > button.MuiButtonBase-root.MuiButton-root.MuiButton-text')
        .click('body > div.MuiPopover-root > div.MuiPaper-root.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded > div > ul > div > li > div.MuiListItemIcon-root > svg')
        .click('body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root > div.MuiPaper-root.individualListingContent.MuiPaper-elevation3.MuiPaper-rounded')
        
        .click('body > div.MuiPopover-root > div:nth-child(1)')
        .typeText('#root > div > div > div > div > div.ListingDetail-Home > div > form > div:nth-child(1) > div > div > input', 'Pembina Luxury Apartment', {replace: true})
        .typeText('#root > div > div > div > div > div.ListingDetail-Home > div > form > div:nth-child(2) > div > div > textarea', 'This is the most expensive apartment in the city!', {replace: true})

        .click('#mui-component-select-num_bedroom')
        .click('#menu-num_bedroom > div.MuiPaper-root.MuiMenu-paper.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded > ul > li:nth-child(4)')

        .click('#mui-component-select-num_bathroom')
        .click('#menu-num_bathroom > div.MuiPaper-root.MuiMenu-paper.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded > ul > li:nth-child(4)')

        .click('#mui-component-select-city')
        .click('#menu-city > div.MuiPaper-root.MuiMenu-paper.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded > ul > li:nth-child(1)')

        .typeText('#root > div > div > div > div > div.ListingDetail-Home > div > form > div.secondLine > div > div > input', '500', {replace: true})

        .click('#root > div > div > div > div > div.ListingDetail-Home > div > form > div.secondLine > button:nth-child(4) > span.MuiIconButton-label > svg')

        .click('#root > div > div > div > div > div.ListingDetail-Home > div > form > div.MuiDialogActions-root.listingDetail-submitSection.MuiDialogActions-spacing > button > span.MuiButton-label')
        .wait(5000)
})

test('Availability test', async t => {
    await t
        .click('[id="homePage_Header_Login"]')
        .typeText('[id="loginEmail"]', 'demo@gmail.com')
        .typeText('[id="loginPassword"]', 'test123')
        .click('#loginDialog > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root.homeDialog-Content > form > div.MuiDialogActions-root.homeDialog-Actions.MuiDialogActions-spacing > button.MuiButtonBase-root.MuiButton-root.MuiButton-text.homeDialog-normalButton > span.MuiButton-label')
        .wait(500)

        //availability test
        .click('#homePage_Header > div > button.MuiButtonBase-root.MuiButton-root.MuiButton-text')
        .click('body > div.MuiPopover-root > div.MuiPaper-root.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded > div > ul > div > li > div.MuiListItemIcon-root > svg')
        .click('body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root > div:nth-child(1) > div.removeListingButtonGroup > div.listingAvailableSwitch > div > div.react-switch-bg')
        .wait(5000)

})


