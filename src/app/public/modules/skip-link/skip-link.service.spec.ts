// #region imports

import {
  ApplicationRef
} from '@angular/core';

import {
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import {
  SkyWindowRefService
} from '@skyux/core';

import {
  expect
} from '@skyux-sdk/testing';

import {
  SkySkipLinkModule
} from './skip-link.module';

import {
  SkySkipLinkService
} from './skip-link.service';

import {
  SkySkipLinkArgs
} from './skip-link-args';

// #endregion

describe('Skip link service', () => {

  let service: SkySkipLinkService;
  let appRef: ApplicationRef;

  function setTestSkipLinks() {
    const args: SkySkipLinkArgs = {
      links: [
        {
          elementRef: undefined,
          title: 'Test 1'
        }
      ]
    };

    service.setSkipLinks(args);

    tick();
    appRef.tick();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkySkipLinkModule
      ],
      providers: [
        SkyWindowRefService
      ]
    });

    service = TestBed.get(SkySkipLinkService);
    appRef = TestBed.get(ApplicationRef);
  });

  it('should only add the host component once at the top of the body', fakeAsync(() => {
    setTestSkipLinks();
    setTestSkipLinks();

    const hostEls = document.querySelectorAll('sky-skip-link-host');

    expect(hostEls.length).toBe(1);
    expect(document.body.firstChild).toBe(hostEls[0]);
  }));

  it('should add the specified links', fakeAsync(() => {
    setTestSkipLinks();

    const linkEl = document.querySelector('.sky-skip-link');

    expect(linkEl).toHaveText('Skip to Test 1');
  }));

});
