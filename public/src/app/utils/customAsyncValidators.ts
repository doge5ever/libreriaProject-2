import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { HttpService } from '../services/http.service';

export const DuplicateEmailValidator = (http: HttpService) => {
  return (control: FormControl) => {
    return http.isEmailAddressDuplicate(control.value)
      .pipe(
        map((response: {duplicateEmailAddress: boolean}) => {
          if (response.duplicateEmailAddress) return response;
          return null
        })
      )  
  }
}