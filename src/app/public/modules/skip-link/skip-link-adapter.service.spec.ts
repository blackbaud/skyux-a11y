import {
  SkySkipLinkAdapterService
} from './skip-link-adapter.service';
import { TestBed } from '@angular/core/testing';
import { SkyWindowRefService } from '@skyux/core';
import { ElementRef } from '@angular/core';

describe('Skip link adapter service', () => {

  const BODY_MARGIN_TOP = 56;
  const TEST_EL_TOP = 83;
  const ADAPTER_SVC_PADDING = 10;

  let mockWindowService: any;
  let scrollSpy: jasmine.Spy;
  let svc: SkySkipLinkAdapterService;
  let testEl: HTMLDivElement;

  beforeEach(() => {
    scrollSpy = jasmine.createSpy('scroll');

    mockWindowService = {
      getWindow: () => ({
        document: {
          body: { }
        },
        getComputedStyle: () => ({
          marginTop: BODY_MARGIN_TOP + 'px'
        }),
        scroll: scrollSpy
      })
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: SkyWindowRefService,
          useValue: mockWindowService
        },
        SkySkipLinkAdapterService
      ]
    });

    svc = TestBed.get(SkySkipLinkAdapterService);

    testEl = document.createElement('div');
    testEl.style.height = (window.outerHeight + 1000) + 'px';
    testEl.style.position = 'absolute';
    testEl.style.top = TEST_EL_TOP + 'px';

    testEl.innerText = 'Testing';

    document.body.appendChild(testEl);
  });

  afterEach(() => {
    document.body.removeChild(testEl);

    testEl = undefined;
  });

  it('should account for the browser\'s margin top property', () => {
    svc.skipTo({
      title: 'Test 1',
      elRef: new ElementRef(testEl)
    });

    expect(scrollSpy).toHaveBeenCalledWith(
      0,
      TEST_EL_TOP - BODY_MARGIN_TOP - ADAPTER_SVC_PADDING
    );
  });

});
