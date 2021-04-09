import { Selector } from 'testcafe';

fixture('Rentr Valid Acc Login').page('https://rentr-front-end.herokuapp.com/');

test('Login Successfully', async (t) => {
  await t
    .maximizeWindow()
    .click('[id="homePage_Header_Login"]')
    .typeText('[id="loginEmail"]', 'demo@gmail.com')
    .typeText('[id="loginPassword"]', 'test123')
    .click(
      '#loginDialog > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root.homeDialog-Content > form > div.MuiDialogActions-root.homeDialog-Actions.MuiDialogActions-spacing > button.MuiButtonBase-root.MuiButton-root.MuiButton-text.homeDialog-normalButton > span.MuiButton-label'
    )
    // .expect(Selector('div > div > div.MuiAlert-message').textContent).contains('Welcome', Selector('div > div > div.MuiAlert-message').textContent)
    .wait(6000)

    .expect(
      Selector('#homePage_Header > div > button > span.MuiButton-label')
        .textContent
    )
    .contains('Good', 'Missing Profile Section');
});
