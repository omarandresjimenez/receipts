import { Component, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  template: `<span class="account-avatar"
             [class.is--have-avatar]="avatarImage"
             [style.width.px] = "avatarSizePixels"
             [style.height.px] = "avatarSizePixels"
             [style.background-size.%]="avatarBGSizePercentage"
             [style.background-image]="avatarImage | appCssUrl">
             </span>
             <span> {{ avatarName }} </span>`,
 styleUrls: [ './avatar.component.scss' ],
 changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements OnInit {
    @Input()
    public avatarImage: string;

    @Input()
    public avatarSizePixels = 39;

    @Input()
    public avatarBGSizePercentage = 100;

    @Input()
    public avatarName = '';

    get showAvatarName(): boolean {
        return this.avatarName.length > 0;
    }

    public ngOnInit() {
    }
}
