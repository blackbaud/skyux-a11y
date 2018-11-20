//#region imports

import {
  Injectable
} from '@angular/core';

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

    const scrollTop = el.offsetTop -
      // Account for body margin top.
      parseInt(getComputedStyle(this.bodyEl).marginTop, 10) -
      // Add 10 pixels padding by default.
      10;

    window.scroll(0, scrollTop);

    el.focus();
  }
}
