import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Router } from '@angular/router';

import * as $ from 'jquery';


@Component({
  templateUrl: './virtual-map.component.html',
  styleUrls: ['./virtual-map.component.scss']
})
export class VirtualMapComponent implements OnInit, AfterViewInit {

  // public sub: Subscription;
  constructor(private router: Router) { }


  ngAfterViewInit() {
    // tslint:disable: deprecation
        $('path, circle').hover((e) => {
          $('#info-box').css('display', 'block');
          $('#info-box').html($(e.target).data('info'));
        });

        $('path, circle').mouseleave((e) => {
          $('#info-box').css('display',  'none');
        });

        $('.map-container').mousemove((e) => {
          const relX = e.pageX - $('.map-container').offset().left;
          const relY = e.pageY - $('.map-container').offset().top;
          $('#info-box').css('top', relY - $('#info-box').height() - 30);
          $('#info-box').css('left', relX - ($('#info-box').width()) / 2);
          // $('#info-box').css('top', relY );
          // $('#info-box').css('left', relX );
        }).mouseover();

        const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (ios) {
          $('a').on('click touchend', () => {
            const link = $(this).attr('href');
            window.open(link, '_blank');
            return false;
          });
        }
}

 ngOnInit() {

 }

  onGo(url) {
    this.router.navigateByUrl(url);
   }

}
