import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'appCssUrl',
})
export class CssUrlPipe implements PipeTransform {

  public constructor(
    private sanitizer: DomSanitizer,
  ) {
  }

  public transform(url: string, isSanitize = true): any {
    if (!url) {
      return undefined;
    }

    const fullUrl = `url('${url}')`;

    return isSanitize ? this.sanitizer.bypassSecurityTrustStyle(fullUrl) : fullUrl;
  }

}