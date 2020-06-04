import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DuplicateEmailValidator } from '../utils/customAsyncValidators'
import { errorMessageObservables } from '../utils/errorMessageObservables';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  subscribeFormGroup: FormGroup;
  emailAddressErrObs: Observable<string>;
  
  constructor(
    private http: HttpService
  ) { };

  ngOnInit(): void {
    this.initializeSubscribeForm();
    this.initializeErrorMessage();
  };

  initializeSubscribeForm = (): void => {
    this.subscribeFormGroup = new FormGroup({
      emailAddress: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.email, Validators.required],
        asyncValidators: DuplicateEmailValidator(this.http)
      })
    })
  };

  initializeErrorMessage = (): void => {
    this.emailAddressErrObs = errorMessageObservables(this.subscribeFormGroup.get('emailAddress'))
  };

  onSubscribe = (): void => {
    if (this.subscribeFormGroup.valid) {
      this.http.postEmailSubscription(this.subscribeFormGroup.value.emailAddress)
        .subscribe(
          (response) => console.log(response)
        )
    }
  };

  subscribeText: string = 'Subscribe now for coupons, great deals and more!';
  subscribeInputPlaceholder: string = 'Enter your email for a coupon!';
  subscribeButtonText = 'Sign Up';
  followUsText: string = 'Follow Us';

  facebookLogoDirectory: string = '../../assets/follow_us/facebook.png';
  twitterLogoDirectory: string = '../../assets/follow_us/twitter.png';
  pinterestLogoDirectory: string = '../../assets/follow_us/pinterest.png';
}
