
import {Selector} from 'testcafe';

fixture('Search and advanced search test (no login))')
    .page('https://rentr-front-end.herokuapp.com/');


test('Advanced Search Test 1: copy info from first listing', async t => {

    //read the first listing and remember its information
    // note: we don't really care about listing title, because that's not part of the
    // advanced search criteria

    // aside: note that the mini-listing selectors will change based on whether a listing full view is open or not. 
    const trueColor = 'rgb(0, 128, 0)';
    const falseColor = 'dang';

    const bathrooms = Selector('#root > div > div > div > div > div.leftPanel-noDetails > div:nth-child(1) > div > div.listingHeader > span > span:nth-child(1)').textContent;
    const bedrooms = Selector('#root > div > div > div > div > div.leftPanel-noDetails > div:nth-child(1) > div > div.listingHeader > span > span:nth-child(2)').textContent;
    const laundry = (trueColor === await (Selector('#root > div > div > div > div > div.leftPanel-noDetails > div:nth-child(2) > div > div.listingHeader > span > span:nth-child(3) > svg').getStyleProperty('color')));
    const pets = (trueColor === await (Selector('#root > div > div > div > div > div.leftPanel-noDetails > div:nth-child(2) > div > div.listingHeader > span > span:nth-child(4) > svg').getStyleProperty('color')));
    const parking = (trueColor === await (Selector('#root > div > div > div > div > div.leftPanel-noDetails > div:nth-child(2) > div > div.listingHeader > span > span:nth-child(5) > svg').getStyleProperty('color')));
    const price = (await Selector('#root > div > div > div > div > div.leftPanel-noDetails > div:nth-child(2) > div > div.listingHeader > div.listingPrice').textContent).replace( /^\D+/g, '');
    
    console.log('info read from second listing: ', await bathrooms, await bedrooms, await laundry, await pets, await parking, await price)

    await t
        
        // input information gathered into advanced search
        .click('#homePage_Header > div > span > button.MuiButtonBase-root.MuiIconButton-root.advancedSearch-Button.MuiIconButton-edgeEnd > span.MuiIconButton-label > svg')
    
})