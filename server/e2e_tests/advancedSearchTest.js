
import {Selector} from 'testcafe';

fixture('Search and advanced search test (no login))')
    .page('https://rentr-front-end.herokuapp.com/');

// We look at the second listing instead of the first listing because we want to check if the second listing gets moved to
// the top after a search has been executed
test('Advanced Search Test 1: copy search from second listing and verify that listing appears in results', async t => {

    const trueColor = 'rgb(0, 128, 0)'; // the color the svg icons are set to when laundry/pets/parking is set to "true"
    const falseColor = 'rgb(128, 128, 128)'; 

    // note that these selectors will fail when the listing view panel is open (since noDetails is switched to withDetails when it is open)
    const bathrooms = Selector('#root > div > div > div > div > div.leftPanel-noDetails > div:nth-child(2) > div > div.listingHeader > span > span:nth-child(1)').textContent;
    const bedrooms = Selector('#root > div > div > div > div > div.leftPanel-noDetails > div:nth-child(2) > div > div.listingHeader > span > span:nth-child(2)').textContent;
    const laundry = (trueColor === await (Selector('#root > div > div > div > div > div.leftPanel-noDetails > div:nth-child(2) > div > div.listingHeader > span > span:nth-child(3) > svg').getStyleProperty('color')));
    const pets = (trueColor === await (Selector('#root > div > div > div > div > div.leftPanel-noDetails > div:nth-child(2) > div > div.listingHeader > span > span:nth-child(4) > svg').getStyleProperty('color')));
    const parking = (trueColor === await (Selector('#root > div > div > div > div > div.leftPanel-noDetails > div:nth-child(2) > div > div.listingHeader > span > span:nth-child(5) > svg').getStyleProperty('color')));
    const price = (await Selector('#root > div > div > div > div > div.leftPanel-noDetails > div:nth-child(2) > div > div.listingHeader > div.listingPrice').textContent).replace( /^\D+/g, '');
    
    console.log('info read from second listing: ', await bathrooms, await bedrooms, await laundry, await pets, await parking, await price)

    const priceMinField = Selector('body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root > form > div > span.advancedSearchForm_min_price > div > div > input');
    const priceMaxField = Selector('body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root > form > div > span.advancedSearchForm_max_price > div > div > input');
    const bathroomMinField = Selector('#mui-component-select-min_num_bathroom');
    const bathroomMaxField = Selector('#mui-component-select-max_num_bathroom');
    const bedroomMinField = Selector('#mui-component-select-min_num_bedroom');
    const bedroomMaxField = Selector('#mui-component-select-max_num_bedroom');
    // const cityField = Selector('#mui-component-select-city'); // city does not appear in mini-views of listings... would be difficult to retrieve it. 
    const laundryField = Selector('body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root > form > div > span.advancedSearchForm-iconButtons > button:nth-child(1) > span.MuiIconButton-label > svg');
    const petsField = Selector('body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root > form > div > span.advancedSearchForm-iconButtons > button:nth-child(2) > span.MuiIconButton-label > svg');
    const parkingField = Selector('body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root > form > div > span.advancedSearchForm-iconButtons > button:nth-child(3) > span.MuiIconButton-label > svg');
    const submitButton = Selector('body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root > form > div > div > button > span.MuiButton-label')

    // purpose: a hacky way to "waste" a click, so we can have a conditional for whether to click laundry/pet/parking
    const uninteractiveRegion = Selector('body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root > form > div > span.advancedSearchForm_min_price > p');

    await t
        .maximizeWindow()

        // input information gathered into advanced search
        .click('#homePage_Header > div > span > button.MuiButtonBase-root.MuiIconButton-root.advancedSearch-Button.MuiIconButton-edgeEnd > span.MuiIconButton-label > svg')
        .typeText(priceMinField, price)
        .typeText(priceMaxField, price)
        .click(bathroomMinField).click(`[data-value=\"${(await bathrooms)}\"]`)
        .click(bathroomMaxField).click(`[data-value=\"${(await bathrooms)}\"]`)
        .click(bedroomMinField).click(`[data-value=\"${(await bedrooms)}\"]`)
        .click(bedroomMaxField).click(`[data-value=\"${(await bedrooms)}\"]`)
        //.click(cityField).click(`[data-value=\"${(await bathrooms).toString()}\"]`) // we cannot access this data via mini-listings, would take effort to implement
        .click((await laundry) ? laundryField : uninteractiveRegion)
        .click((await pets) ? petsField : uninteractiveRegion)
        .click((await parking) ? parkingField : uninteractiveRegion)
        .click(submitButton)

        .wait(1000)
    
        // Now we verify that the top result in the listing list matches our search criteria.
        // Our criteria was constructed to match an existing listing, so we should be guaranteed a matching result.
        .expect(Selector('#root > div > div > div > div > div.leftPanel-noDetails > div:nth-child(1) > div > div.listingHeader > span > span:nth-child(1)').textContent)
        .eql(await bathrooms, 'bathrooms field does not match')
        
        .expect(Selector('#root > div > div > div > div > div.leftPanel-noDetails > div:nth-child(1) > div > div.listingHeader > span > span:nth-child(2)').textContent)
        .eql(await bedrooms, 'bedrooms field does not match')
        
        .expect(Selector('#root > div > div > div > div > div.leftPanel-noDetails > div:nth-child(1) > div > div.listingHeader > span > span:nth-child(3) > svg').getStyleProperty('color'))
        .eql((await laundry) ? trueColor : falseColor, 'laundry icon color does not match: ' + (await (Selector('#root > div > div > div > div > div.leftPanel-noDetails > div:nth-child(1) > div > div.listingHeader > span > span:nth-child(3) > svg').getStyleProperty('color'))))
        
        .expect(Selector('#root > div > div > div > div > div.leftPanel-noDetails > div:nth-child(1) > div > div.listingHeader > span > span:nth-child(4) > svg').getStyleProperty('color'))
        .eql((await pets) ? trueColor : falseColor, 'pet icon color does not match: ' + (await (Selector('#root > div > div > div > div > div.leftPanel-noDetails > div:nth-child(1) > div > div.listingHeader > span > span:nth-child(4) > svg').getStyleProperty('color'))))
        
        .expect(Selector('#root > div > div > div > div > div.leftPanel-noDetails > div:nth-child(1) > div > div.listingHeader > span > span:nth-child(5) > svg').getStyleProperty('color'))
        .eql((await parking) ? trueColor : falseColor, 'parking color does not match:' + (await (Selector('#root > div > div > div > div > div.leftPanel-noDetails > div:nth-child(1) > div > div.listingHeader > span > span:nth-child(5) > svg').getStyleProperty('color'))))
        
        .expect((Selector('#root > div > div > div > div > div.leftPanel-noDetails > div:nth-child(1) > div > div.listingHeader > div.listingPrice').textContent))
        .eql('$'+ (await price), 'price does not match: ')

    .wait(1000) // just so you can verify visually
})