//#region imports

import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  SkySkipLinkService
} from '../../public';

//#endregion

@Component({
  selector: 'app-skip-link-demo',
  templateUrl: './skip-link-demo.component.html',
  styleUrls: ['./skip-link-demo.component.scss']
})
export class SkipLinkDemoComponent implements OnInit {

  @ViewChild('link1')
  public link1: ElementRef;

  constructor(
    private skipLinkService: SkySkipLinkService
  ) { }

  public ngOnInit(): void {
    this.skipLinkService.setSkipLinks({
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
