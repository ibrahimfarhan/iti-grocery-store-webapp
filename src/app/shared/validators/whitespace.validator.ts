import { AbstractControl } from '@angular/forms';

export class WhiteSpaceValidator {
    static checkWhiteSpace (c:AbstractControl): {[key:string]: boolean } | null{
        if (c.value.indexOf(' ') >= 0) {
          return {'whiteSpace': true}
        }
        return null; 
    }
}