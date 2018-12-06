//#region imports

import {
  DebugElement,
  ElementRef
} from '@angular/core';

import {
  By
} from '@angular/platform-browser';

import {
  TestBed
} from '@angular/core/testing';

import {
  SkyWindowRefService
} from '@skyux/core';

import {
  expect
} from '@skyux-sdk/testing';

import {
  SkySkipLinkHostComponent
} from './skip-link-host.component';

import {
  SkySkipLink
} from './skip-link';

import {
  SkySkipLinkModule
} from './skip-link.module';

//#endregion

describe('Skip link host component', () => {

  let testEl1: HTMLDivElement;
  let testEl2: HTMLDivElement;

  function createTestDiv(): HTMLDivElement {
    const testEl = document.createElement('div');
    testEl.tabIndex = -1;

    document.body.appendChild(testEl);

    return testEl;
  }

  function validateSkipLink(
    link: SkySkipLink,
    skipLinkEl: DebugElement,
    elToFocus: HTMLElement
  ) {
    expect(skipLinkEl.nativeElement).toHaveText(`Skip to ${link.title}`);

    skipLinkEl.nativeElement.click();

    expect(document.activeElement).toBe(elToFocus);
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

    testEl1 = createTestDiv();
    testEl2 = createTestDiv();
  });

  afterEach(() => {
    document.body.removeChild(testEl1);
    document.body.removeChild(testEl2);
  });

  it('should render a list of skip links', () => {
    const fixture = TestBed.createComponent(SkySkipLinkHostComponent);

    const links = [
      {
        elRef: new ElementRef(testEl1),
        title: 'Link 1'
      },
      {
        elRef: new ElementRef(testEl2),
        title: 'Link 2'
      }
    ];

    fixture.componentInstance.links = links;

    fixture.detectChanges();

    const skipLinkEls = fixture.debugElement.queryAll(By.css('.sky-skip-link'));

    validateSkipLink(links[0], skipLinkEls[0], testEl1);
    validateSkipLink(links[1], skipLinkEls[1], testEl2);
  });

});
