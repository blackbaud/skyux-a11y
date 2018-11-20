//#region imports

import {
  Injectable
} from '@angular/core';

import * as zenscroll from 'zenscroll';

import {
  SkyWindowRefService
} from '@skyux/core';

import {
  SkySkipLink
} from './skip-link';

//#endregion

@Injectable()
export class SkySkipLinkAdapterService {

  private docRef: Document;

  private bodyEl: HTMLElement;

  constructor(
    private windowRef: SkyWindowRefService
  ) {
    this.docRef = this.windowRef.getWindow().document;
    this.bodyEl = this.docRef.body;
  }

  public addHostEl() {
    const el = this.docRef.createElement('sky-skip-link-host');

    this.bodyEl.insertBefore(el, this.bodyEl.firstChild);
  }

  public skipTo(link: SkySkipLink) {
    const el = link.elRef.nativeElement;

    zenscroll.to(
      el,
      0,
      () => {
        el.focus();
      }
    );
  }
}
