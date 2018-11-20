//#region imports

import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable
} from '@angular/core';

import {
  SkySkipLinkArgs
} from './skip-link-args';

import {
  SkySkipLinkHostComponent
} from './skip-link-host.component';

import {
  SkySkipLinkAdapterService
} from './skip-link-adapter.service';

//#endregion

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
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private adapter: SkySkipLinkAdapterService
  ) { }

  public setSkipLinks(args: SkySkipLinkArgs) {
    // Wait for the next change detection cycle.
    setTimeout(() => {
      const host = this.createHostComponent();

      host.instance.links = args.links;
    });
  }

  private createHostComponent(): ComponentRef<SkySkipLinkHostComponent> {
    if (!SkySkipLinkService.host) {
      const factory = this.resolver.resolveComponentFactory(SkySkipLinkHostComponent);

      this.adapter.addHostEl();

      const cmpRef = this.appRef.bootstrap(factory);

      SkySkipLinkService.host = cmpRef;
    }

    return SkySkipLinkService.host;
  }

}
