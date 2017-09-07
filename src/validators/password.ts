import { FormControl } from '@angular/forms';

export class PasswordValidator {

    static isValid(control: FormControl): any {

        // if(control.value.length < 8){
        //     return {
        //         "The length of password should greater than 8": true
        //     };
        // }
        //
        if(control.value !== 10){
            return {
                "The length of password should less than 10": true
            };
        }

        return null;
    }

}