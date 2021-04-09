import { Selector } from 'testcafe';

// declared here so different tests can access the same data.
const listingTitle = 'Test Title';
const listingDescription = 'Test Description';

fixture('Creation and deletion').page('https://rentr-front-end.herokuapp.com/');

// assumption: there exists an account with the given email and password
test('Creation and deletion', async (t) => {
  await t
    .maximizeWindow()
    // login
    .click('[id="homePage_Header_Login"]')
    .typeText('[id="loginEmail"]', 'creationtester@gmail.com') // if hooking this into registration, can change credentials to match
    .typeText('[id="loginPassword"]', 'test123')
    .click(
      '#loginDialog > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root.homeDialog-Content > form > div.MuiDialogActions-root.homeDialog-Actions.MuiDialogActions-spacing > button.MuiButtonBase-root.MuiButton-root.MuiButton-text.homeDialog-normalButton > span.MuiButton-label'
    )
    .wait(6000)

    // add a listing
    .click('#homePage_Header_Login > span.MuiButton-label')
    .typeText('[id="title"]', listingTitle)
    .typeText('[id="description"]', listingDescription)
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
    .click('#city')
    .click('[data-value="Winnipeg"')
    .click(
      'body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root.homeDialog-Content > form > div.MuiDialogActions-root.createlistingDialog-Actions.MuiDialogActions-spacing > button > span.MuiButton-label'
    )
    .wait(1000)

    // delete the listing.
    .click('#homePage_Header > div > button > span.MuiButton-label > svg')
    .click(
      'body > div.MuiPopover-root > div.MuiPaper-root.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded > div > ul > div > li > div.MuiListItemText-root > span'
    )
    .wait(1000)
    .setNativeDialogHandler(() => true)
    .click(
      'body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root > div > div.removeListingButtonGroup > div.removeListingButton > button > span.MuiIconButton-label > svg'
    )
    .click(
      'body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogTitle-root.profile-title > h2 > button > span.MuiIconButton-label > svg'
    )
    .wait(3000);
});
