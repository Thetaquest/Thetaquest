import { AbstractControl } from "@angular/forms";

export function ConfirmPasswordValidator(control: AbstractControl): { [key: string]: boolean } | null{
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && ( password.value !== confirmPassword.value ) ? 
        { 'passwordMismatch' : true} : 
        null;
}
