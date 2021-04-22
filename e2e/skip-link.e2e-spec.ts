import { expect, SkyHostBrowser } from '@skyux-sdk/e2e';

import { browser } from 'protractor';

describe('Skip link', () => {
  function focusSkipLink() {
    return browser.executeScript(
      `document.querySelector('.sky-skip-link').focus();`
    );
  }

  function validateScreenshot(name: string, done: DoneFn) {
    expect('#skip-link-screenshot').toMatchBaselineScreenshot(done, {
      screenshotName: name
    });
  }

  beforeEach(() => {
    SkyHostBrowser.get('visual/skip-link');
    SkyHostBrowser.setWindowBreakpoint('lg');
  });

  it('should match previous screenshot when a skip link is not focused', (done) => {
    validateScreenshot('sky-skip-link-not-focused', done);
  });

  it('should match previous screenshot when a skip link is focused', (done) => {
    focusSkipLink().then(() => {
      validateScreenshot('sky-skip-link-focused', done);
    });
  });
});
