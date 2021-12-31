import * as Yup from 'yup';

const loginValidationScheme = Yup.object().shape({
    email: Yup
        .string()
        .email("Vul een geldig emailadres in.")
        .required('Emailadres is een verplicht veld.'),
    password: Yup
        .string()
        .min(7, ({ min }) => `Wachtwoord moet minstens ${min} karakters bevatten.`)
        .required('Wachtwoord is een verplicht veld.'),
});

export default loginValidationScheme;