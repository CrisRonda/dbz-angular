import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  showFiller = false;

  constructor() {}

  ngOnInit(): void {}
  openSocialLink(sn: string) {
    let url = '';
    switch (sn) {
      case 'fb':
        url = 'https://www.facebook.com/cristian.ronda2';
        break;
      case 'md':
        url = 'https://cristian-ronda.medium.com/';
        break;
      case 'gh':
        url = 'https://github.com/CristianRonda';
        break;
      case 'lk':
        url = 'https://www.linkedin.com/in/cristian-ronda-169414180/';
        break;
      default:
        url = 'https://cristian-ronda.tk/';
        break;
    }
    window.open(url, '_blank');
  }
}
