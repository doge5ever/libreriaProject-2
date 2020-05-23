import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  subscribeFormGroup: FormGroup;
  validationErrorMessageHidden: boolean;
  httpErrorMessageHidden: boolean;
  
  constructor(
    private http: HttpService
  ) { };

  ngOnInit(): void {
    this.initializeFormGroup();
    this.hideErrorMessages();
  };

  initializeFormGroup = (): void => {
    this.subscribeFormGroup = new FormGroup({
      emailAddress: new FormControl(null, [Validators.email, Validators.required])
    });
  };

  hideErrorMessages = (): void => {
    this.validationErrorMessageHidden = true;
    this.httpErrorMessageHidden = true;
  }

  submitEmailAddress = (): void => {
    this.hideErrorMessages();
    if (this.subscribeFormGroup.valid) {
      this.http.postEmailSubscription(this.subscribeFormGroup.value.emailAddress)
        .subscribe(
          (response) => console.log(response),
          (error) => this.httpErrorMessageHidden = false
        )
    } else {this.validationErrorMessageHidden = false;}
  };

  subscribeText: string = 'Subscribe now for coupons, great deals and more!';
  subscribeInputPlaceholder: string = 'Enter your email for a coupon!';
  subscribeButtonText = 'Sign Up';
  followUsText: string = 'Follow Us';

  facebookLogoDirectory: string = '../../assets/follow_us/facebook.png';
  twitterLogoDirectory: string = '../../assets/follow_us/twitter.png';
  pinterestLogoDirectory: string = '../../assets/follow_us/pinterest.png';
}
