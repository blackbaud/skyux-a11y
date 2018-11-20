//#region imports

import {
  Component,
  OnInit,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  SkySkipLinkService
} from '../../public/modules/skip-link/skip-link.service';

//#endregion

@Component({
  selector: 'app-skip-link-demo',
  templateUrl: './skip-link-demo.component.html',
  styleUrls: ['./skip-link-demo.component.scss']
})
export class SkipLinkDemoComponent implements OnInit {

  @ViewChild('link1')
  public link1: ElementRef;

  constructor(private skipLinkSvc: SkySkipLinkService) { }

  public ngOnInit() {
    this.skipLinkSvc.setSkipLinks({
      links: [
        {
          title: 'area 1',
          elRef: this.link1
        },
        {
          title: 'area 2',
          elRef: this.link1
        },
        {
          title: 'area 3',
          elRef: this.link1
        },
        {
          title: 'area 4',
          elRef: this.link1
        }
      ]
    });
  }

}
