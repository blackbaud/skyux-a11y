import {
  NgModule
} from '@angular/core';

import {
  SkySkipLinkModule
} from './public/modules/skip-link/skip-link.module';

@NgModule({
  exports: [
    SkySkipLinkModule
  ],
  entryComponents: []
})
export class AppExtrasModule { }
