import * as yup from 'yup';

export interface ResetPasswordModel{
    password: string;
    confirmPassword: string;
}

export const ResetPasswordValidationSchema = yup.object().shape({
    password:  yup.string().required('Inserire la password').min(6, 'La password deve essere lunga almeno 6 caratteri'),
    confirmPassword:  yup.string().required('Reinserire la password').test('passwords-match', 'Le password non corrispondono', function(value) {
        return this.parent.password === value;
    }),
});

export const ResetPasswordInitialFrom: ResetPasswordModel = {
    password: '',
    confirmPassword: '',
}
