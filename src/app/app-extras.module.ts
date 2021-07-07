import {
  NgModule
} from '@angular/core';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  SkyA11yForRootCompatModule
} from './public/modules/shared/a11y-for-root-compat.module';

import {
  SkySkipLinkModule
} from './public/public_api';

@NgModule({
  imports: [
    SkyA11yForRootCompatModule
  ],
  exports: [
    SkyAppLinkModule,
    SkySkipLinkModule
  ]
})
export class AppExtrasModule { }
