
import {Selector} from 'testcafe';

fixture('Search and advanced search test (no login))')
    .page('https://rentr-front-end.herokuapp.com/');

test('Search Test 1: Dalhousie Search Term', async t => {

    await t
        // Assuming there is a listing with the text 'Dalhousie' in the title, check if search 
        // pulls up at least one listing with 'Apartment' in the title. 
        .typeText('#headerSearchField', 'Dalhousie')
        .click('#homePage_Header > div > span > button.MuiButtonBase-root.MuiButton-root.MuiButton-text.keywordSearchButton > span.MuiButton-label')
        .wait(100)
        .expect(Selector('#root > div > div > div > div > div.leftPanel-noDetails > div.MuiPaper-root.individualListingContent.MuiPaper-elevation3.MuiPaper-rounded > div > div.listingHeader > div.listingTitle').textContent).contains('Dalhousie', 'Should say Dalhousie')
        .wait(500)
})

test('Search Test 2: Apartment Search Term', async t => {

    await t
        // Assuming there is a listing with the text 'Apartment' in the title, check if search 
        // pulls up at least one listing with 'Apartment' in the title. 
        .typeText('#headerSearchField', 'Apartment')
        .click('#homePage_Header > div > span > button.MuiButtonBase-root.MuiButton-root.MuiButton-text.keywordSearchButton > span.MuiButton-label')
        .wait(100)
        .expect(Selector('#root > div > div > div > div > div.leftPanel-noDetails > div.MuiPaper-root.individualListingContent.MuiPaper-elevation3.MuiPaper-rounded > div > div.listingHeader > div.listingTitle').textContent).contains('Apartment', 'Should say Dalhousie')
        .wait(500)
})

