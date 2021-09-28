import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isBanqWidgetOpen: boolean;

  constructor() {
    this.isBanqWidgetOpen = false;
  }

  openBanqWidget() {
    this.isBanqWidgetOpen = true
  }

  closeBanqWidget() {
    this.isBanqWidgetOpen = false
  }

  getPaymentLink() {
    return 'https://link.banq.com/4x1t09WiOjb'
  }

  getEnv() {
    return 'development'
  }

  onPaymentSuccess() {
    alert('success')
  }

}
