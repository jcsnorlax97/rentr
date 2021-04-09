import {Selector} from 'testcafe';

fixture('qna Testing - while user is not logged in').page(
  'https://rentr-front-end.herokuapp.com/'
);

// test assumption: this test assumes the first listing has a question attached to it.
// test acceptance condition: test passes if an error message pops up with a message containing the word "Error"
test('Attempt to post a question and reply without being logged in', async t => {
    await t
        .maximizeWindow()
        // try to post a question
        .click('#root > div > div > div > div > div.leftPanel-noDetails > div:nth-child(1) > div')
        .click('#root > div > div > div > div > div.ListingDetail-Home > div > div.listingIconText > div:nth-child(5) > div > div')
        .typeText('#root > div > div > div > div > div.ListingDetail-Home > div > div.listingIconText > div:nth-child(5) > div > div > textarea:nth-child(1)', 'Quality Assurance Test: this question should not exist')
        .click('#root > div > div > div > div > div.ListingDetail-Home > div > div.listingIconText > div:nth-child(5) > button > span.MuiButton-label')
    
        // check for error message
        .expect(Selector('#root > div > div > div > div > div.ListingDetail-Home > div > div.MuiSnackbar-root.MuiSnackbar-anchorOriginBottomCenter > div').textContent)
        .contains('Error', 'No error message following attempt to post a question without being logged in')
    
        .wait (500)

        // try to post a reply
        .click('#root > div > div > div > div > div.ListingDetail-Home > div > div.listingIconText > div:nth-child(1) > div > div.detailListing-QnA-Comment-of-Questions > div > div > textarea:nth-child(1)')
        .typeText('#root > div > div > div > div > div.ListingDetail-Home > div > div.listingIconText > div:nth-child(1) > div > div.detailListing-QnA-Comment-of-Questions > div > div > textarea:nth-child(1)', 'reply should fail to post')
        .click('#root > div > div > div > div > div.ListingDetail-Home > div > div.listingIconText > div:nth-child(1) > div > div.detailListing-QnA-Comment-of-Questions > button > span.MuiButton-label')

        // check for error message
        .expect(Selector('#root > div > div > div > div > div.ListingDetail-Home > div > div.MuiSnackbar-root.MuiSnackbar-anchorOriginBottomCenter > div > div.MuiAlert-message').textContent)
        .contains('Error', 'No error message following attempt to post reply without being logged in')
    
        .wait(500)
})



