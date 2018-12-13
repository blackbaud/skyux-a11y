// #region imports

import {
  ComponentRef,
  Injectable
} from '@angular/core';

import {
  SkyDynamicComponentService, SkyDynamicComponentLocation, SkyWindowRefService
} from '@skyux/core';

import {
  SkySkipLinkArgs
} from './skip-link-args';

import {
  SkySkipLinkHostComponent
} from './skip-link-host.component';

// #endregion

/**
 * An Angular service that "skip links" to be added to the page.  Skip links will only be displayed
 * when the page initially loads and the user presses the Tab key, in which case the first link will
 * be displayed and focused.  Clicking the button will skip to the specified element.  Pressing
 * the Tab key again will move to the next skip link if more than one skip link is specified;
 * otherwise, focus will move to the first focusable element on the page.
 */
@Injectable()
export class SkySkipLinkService {
  private static host: ComponentRef<SkySkipLinkHostComponent>;

  constructor(
    private dynamicComponentService: SkyDynamicComponentService,
    private windowRef: SkyWindowRefService
  ) { }

  public setSkipLinks(args: SkySkipLinkArgs) {
    // Timeout needed in case the consumer sets the skip links within an Angular lifecycle hook.
    this.windowRef.getWindow().setTimeout(() => {
      const host = this.createHostComponent();
      host.instance.links = args.links;
    });
  }

  private createHostComponent(): ComponentRef<SkySkipLinkHostComponent> {
    if (!SkySkipLinkService.host) {
      const componentRef = this.dynamicComponentService.createComponent(
        SkySkipLinkHostComponent,
        {
          location: SkyDynamicComponentLocation.BodyTop
        }
      );

      SkySkipLinkService.host = componentRef;
    }

    return SkySkipLinkService.host;
  }

}
