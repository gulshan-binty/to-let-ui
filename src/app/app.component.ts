import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, isPlatformServer, registerLocaleData} from "@angular/common";
import {UserService} from "./services/common/user.service";
import localeBn from '@angular/common/locales/bn';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isBrowser: boolean;
  isServer: boolean;

  constructor(
      private userService: UserService,
      @Inject(PLATFORM_ID) public platform: any
  ) {
    registerLocaleData(localeBn, 'bn');
    this.userService.autoUserLoggedIn();

    this.isBrowser = isPlatformBrowser(this.platform);
    this.isServer = isPlatformServer(this.platform);
  }

  ngOnInit() {
    // this.jj();

  }

  // private jj() {
  //
  //   function productPrice(number) {
  //
  //     // Extract the integer part
  //     const integer = Math.floor(number);
  //     const fractional = number - integer;
  //
  //     //Converting the fractional to the integer
  //     const frac2int = (fractional * 100) / 5;
  //     const fracCeil = Math.ceil(frac2int);
  //
  //     //transforming inter into fractional
  //     const FracOut = (fracCeil * 5) / 100;
  //     const ans = integer + FracOut;
  //
  //     const finalOutput = (Math.round(ans * 100) / 100).toFixed(2);
  //
  //
  //     console.log("Input: " + number);
  //     console.log("Output: " + finalOutput);
  //   }
  //
  //   productPrice(21.59878);
  // }


}
