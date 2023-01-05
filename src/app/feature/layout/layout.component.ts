import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SideNavOption } from 'src/app/shared/controls/side-nav/side-nav-option';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  menu: SideNavOption[] = [
    {
      name: this.translate.instant('MENU.FORM'),
      route: '/simple-form',
    }
  ];

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {}
}
