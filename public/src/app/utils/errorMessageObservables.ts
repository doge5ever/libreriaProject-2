import { AbstractControl, FormControl } from "@angular/forms";
import { Observable } from 'rxjs';

const errorPriority: Array<string> = [
  'required',
  'requiredTrue',
  'minlength',
  'maxlength',
  'min',
  'max',
  'pattern',
  'email',
  'duplicateEmailAddress'
];

const locateFieldName: Object = {
  emailAddress: 'Email Address',
};

export const errorMessageObservables = (formControl: FormControl | AbstractControl) => {
  let errorType: string;

  return Observable.create((subscriber) => {
    formControl.statusChanges.subscribe((value) => {
      if (formControl.errors) {
        for (let i=0; i<errorPriority.length; i++) {
          let formControlErrors = Object.keys(formControl.errors);
          if (formControlErrors.includes(errorPriority[i])) {
            errorType = errorPriority[i];
            break;
          }
        }
        subscriber.next(getErrorMessage(formControl, errorType));
      } else {
        subscriber.next('');
      }
    })
  })
};

const getErrorMessage = (formControl: FormControl | AbstractControl, errorType: string): string  => {
  let fieldName = locateFieldName[getControlName(formControl)];

  switch (errorType) {
    case 'required':
      return `${fieldName} is required.`;
    case 'requiredTrue':
      return `${fieldName} is required.`;
    case 'pattern':
      return `${fieldName} provided is invalid.`;
    case 'email':
      return `Email address provided is invalid.`;
    case 'minlength':
      return `${fieldName} must have at least ${formControl.errors.minlength.requiredLength} characters.`;
    case 'maxlength':
      return `${fieldName} must have at most ${formControl.errors.maxlength.requiredLength} characters.`;
    case 'min':
      return `${fieldName} must be at least ${formControl.errors.max.max}.`;
    case 'max':
      return `${fieldName} must be at most ${formControl.errors.min.min}.`;
    case 'duplicateEmailAddress':
      return `Email address is already registered.`
    default:
      return 'An error has occurred.';
    }  
}

const getControlName = (control: FormControl | AbstractControl): string | null => {
  const formGroup = control.parent.controls;
  return Object.keys(formGroup).find(name => control === formGroup[name]) || null;
};
