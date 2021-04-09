// eslint-disable-next-line import/no-extraneous-dependencies
import { Selector } from 'testcafe';

// buttons
const loginBtn = '[id="homePage_Header_Login"]';
const loginFormLoginBtn =
  '#loginDialog > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root.homeDialog-Content > form > div.MuiDialogActions-root.homeDialog-Actions.MuiDialogActions-spacing > button.MuiButtonBase-root.MuiButton-root.MuiButton-text.homeDialog-normalButton > span.MuiButton-label';
const addListingBtn = '[id="homePage_Header_Login"]';
const addListingSubmissionBtn =
  'body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root.homeDialog-Content > form > div.MuiDialogActions-root.createlistingDialog-Actions.MuiDialogActions-spacing > button > span.MuiButton-label';

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
  '#root > div > div > div > div > div.leftPanel-noDetails';
// div[text="QnA Test Listing - Title"] | div[innertext="QnA Test Listing - Title"]';

fixture.disablePageCaching`QnA Section - Pose a new question (login required)`.page(
  'https://rentr-front-end.herokuapp.com/'
);

// const newListingPanelDiv = Selector(() => {
//   return document.get
// })
// const article = Selector(() => {
//   return document.getElementById('article-content');
// });

// const demoRole = Role(
//   'https://rentr-front-end.herokuapp.com/login',
//   async (t) => {
//     await t
//       // .expect(loginBtn.exists).ok()
//       .click(loginBtn)
//       .typeText('#loginEmail', 'test@gmail.com')
//       .typeText('#loginPassword', '123456789')
//       .click(loginFormLoginBtn)
//       .wait(6000);
//   }
// );

// test('[1] Login as a registered user', async (t) => {
//   await t.useRole(demoRole);
// });

test('[2] Add a new listing', async (t) => {
  await t

    // [1] login
    .click(loginBtn)
    .typeText('#loginEmail', 'test@gmail.com')
    .typeText('#loginPassword', '123456789')
    .click(loginFormLoginBtn)
    .wait(6000)

    // [2] add listing
    .click(addListingBtn)
    .typeText(addListingFormTitleTextField, 'QnA Test Listing - Title')
    .typeText(
      addListingFormDescriptionTextField,
      'QnA Test Listing - Description'
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
    .click(
      Selector(newListingPanelDiv).withExactText('QnA Test Listing - Title')
    )
    .wait(6000);
});
