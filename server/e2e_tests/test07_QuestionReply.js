import { Selector } from 'testcafe';
import XPathSelector from './xpath-selector';

// buttons
const loginBtn = '[id="homePage_Header_Login"]';
const loginFormLoginBtn =
  '#loginDialog > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root.homeDialog-Content > form > div.MuiDialogActions-root.homeDialog-Actions.MuiDialogActions-spacing > button.MuiButtonBase-root.MuiButton-root.MuiButton-text.homeDialog-normalButton > span.MuiButton-label';
const addListingBtn = '[id="homePage_Header_Login"]';
const addListingSubmissionBtn =
  'body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root.homeDialog-Content > form > div.MuiDialogActions-root.createlistingDialog-Actions.MuiDialogActions-spacing > button > span.MuiButton-label';
const newListingPanelQnAQuestionAskingSubmissionBtn =
  '//button[@class="MuiButtonBase-root MuiButton-root MuiButton-text" and span[contains(text(), "Create")]]';
const newListingPanelClosingBtn =
  'button.MuiButtonBase-root.MuiIconButton-root.listingDetailHeader-closeButton';
const loggedInHeaderGoodAfternoonBtn =
  '//button[@class="MuiButtonBase-root MuiButton-root MuiButton-text"]';
const loggedInHeaderProfileBtn =
  '//span[text()="Profile"]/parent::div/parent::li';
const profileListingDeletionBtn =
  '//span[@class="listingTitle" and contains(text(), "QnA Test (Reply) Listing - Title")]/parent::span/parent::div/following-sibling::div/div[@class="removeListingButton"]/button';
const profileClosingBtn =
  'button.MuiButtonBase-root.MuiIconButton-root.profile-title-closeButton';
const newListingPanelQnAQuestionReplyingSubmissionBtn =
  '//button[@class="MuiButtonBase-root MuiButton-root MuiButton-text" and span[contains(text(), "Reply")]]';

// add listing - form fields
const addListingFormTitleTextField = '[id="title"]';
const addListingFormDescriptionTextField = '[id="description"]';
const addListingFormNumBedroomSelr = '[id="num_bedroom"]';
const addListingFormNumBathroomSelr = '[id="num_bathroom"]';
const addListingFormCitySelr = '[id="city"]';
const addListingFormPriceTextField = '[id="price"]';
const addListingFormIsLaundryAvailableSelr = '[id="is_laundry_available"]';
const addListingFormIsPetAllowedSelr = '[id="is_pet_allowed"]';
const addListingFormIsParkingAvailableSelr = '[id="is_parking_available"]';

// add listing - form selection values
const addListingFormNumBedroomValSelr = '[data-value="2"]';
const addListingFormNumBathroomValSelr = '[data-value="2"]';
const addListingFormCityValSelr = '[data-value="Winnipeg"]';
const addListingFormIsLaundryAvailableValSelr = '[data-value="true"]';
const addListingFormIsPetAllowedValSelr = '[data-value="true"]';
const addListingFormIsParkingAvailableValSelr = '[data-value="true"]';

// listing panel
const newListingPanelDiv =
  '//div[@class="listingTitle" and contains(text(), "QnA Test (Reply) Listing - Title")]';
const newListingPanelQnAQuestionAskingTextField =
  '//button[@class="MuiButtonBase-root MuiButton-root MuiButton-text" and span[contains(text(), "Create")]]/preceding-sibling::div';

// QnA reply
const newListingPanelQnAQuestionOneTextArea =
  '#root > div > div > div > div > div.ListingDetail-Home > div > div.listingIconText > div:nth-child(1) > div > div.detailListing-QnA-Comment-of-Questions > div > div > textarea:nth-child(1)';
const newListingPanelQnAQuestionOneReplyOne =
  '//div[@class="listingIconText"]/div[1]/div[@class="questionQnA"]/div[@class="answerQnA"]';

// ------------------------------------------------------------------------
// Fixture
// ------------------------------------------------------------------------

fixture.disablePageCaching`QnA Section - Reply a question (login required)`.page(
  'https://rentr-front-end.herokuapp.com/'
);

test('Reply a new Question (login -> add listing -> add question -> reply the question)', async (t) => {
  await t

    // [1] login
    .click(loginBtn)
    .typeText('#loginEmail', 'demo@gmail.com')
    .typeText('#loginPassword', 'test123')
    .click(loginFormLoginBtn)
    .wait(6000)

    // [2] add listing
    .click(addListingBtn)
    .typeText(addListingFormTitleTextField, 'QnA Test (Reply) Listing - Title')
    .typeText(
      addListingFormDescriptionTextField,
      'QnA Test (Reply) Listing - Description'
    )
    .click(addListingFormNumBedroomSelr)
    .click(addListingFormNumBedroomValSelr)
    .click(addListingFormNumBathroomSelr)
    .click(addListingFormNumBathroomValSelr)
    .click(addListingFormCitySelr)
    .click(addListingFormCityValSelr)
    .typeText(addListingFormPriceTextField, '700')
    .click(addListingFormIsLaundryAvailableSelr)
    .click(addListingFormIsLaundryAvailableValSelr)
    .click(addListingFormIsPetAllowedSelr)
    .click(addListingFormIsPetAllowedValSelr)
    .click(addListingFormIsParkingAvailableSelr)
    .click(addListingFormIsParkingAvailableValSelr)
    .click(addListingSubmissionBtn)
    .wait(6000)

    // [3] pose questions
    .click(XPathSelector(newListingPanelDiv))
    .typeText(
      XPathSelector(newListingPanelQnAQuestionAskingTextField),
      'Would there be a park nearby?'
    )
    .click(XPathSelector(newListingPanelQnAQuestionAskingSubmissionBtn))
    .wait(6000)

    // [4] reply the question
    .click(newListingPanelQnAQuestionOneTextArea)
    .typeText(newListingPanelQnAQuestionOneTextArea, 'reply101')
    .click(XPathSelector(newListingPanelQnAQuestionReplyingSubmissionBtn))
    .wait(6000)

    .expect(XPathSelector(newListingPanelQnAQuestionOneReplyOne).exists)
    .ok()
    .expect(
      XPathSelector(newListingPanelQnAQuestionOneReplyOne).withText('reply101')
        .exists
    )
    .ok()

    // [5] clean up (close listing panel -> my profile -> delete listing)
    .click(newListingPanelClosingBtn)
    .click(XPathSelector(loggedInHeaderGoodAfternoonBtn))
    .click(XPathSelector(loggedInHeaderProfileBtn))
    .wait(6000)
    .setNativeDialogHandler(() => true)
    .click(XPathSelector(profileListingDeletionBtn))
    .wait(6000)
    .click(profileClosingBtn)
    .wait(3000)
    .click(XPathSelector(loggedInHeaderGoodAfternoonBtn))
    .wait(3000);
});
