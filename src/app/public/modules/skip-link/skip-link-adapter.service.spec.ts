import {
  SkySkipLinkAdapterService
} from './skip-link-adapter.service';
import { TestBed } from '@angular/core/testing';
import { SkyWindowRefService } from '@skyux/core';
import { ElementRef } from '@angular/core';

describe('Skip link adapter service', () => {

  let svc: SkySkipLinkAdapterService;
  let styleEl: HTMLStyleElement;
  let testEl1: HTMLDivElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SkyWindowRefService,
        SkySkipLinkAdapterService
      ]
    });

    document.body.classList.add('skip-link-margin-test');

    svc = TestBed.get(SkySkipLinkAdapterService);

    testEl1 = document.createElement('div');
    testEl1.style.height = (window.outerHeight + 1000) + 'px';
    testEl1.style.position = 'absolute';
    testEl1.style.top = '83px';

    testEl1.innerText = 'Testing';

    document.body.appendChild(testEl1);
  });

  afterEach(() => {
    document.body.classList.remove('skip-link-margin-test');

    if (styleEl) {
      document.head.removeChild(styleEl);
    }

    document.body.removeChild(testEl1);

    styleEl =
      testEl1 =
      undefined;
  });

  it('should account for the browser\'s margin top property', () => {
    styleEl = document.createElement('style');

    styleEl.appendChild(
      document.createTextNode(`
        .skip-link-margin-test {
          margin-top: 56px;
        }
      `
      )
    );

    document.head.appendChild(styleEl);

    svc.skipTo({
      title: 'Test 1',
      elRef: new ElementRef(testEl1)
    });

    expect(window.scrollY).toBe(83 - 56 - 10);
  });

});
