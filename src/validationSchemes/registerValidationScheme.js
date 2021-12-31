import * as Yup from 'yup';

const registerValidationScheme = Yup.object().shape({
    name: Yup
        .string()
        .required('Volledige Naam is een verplicht veld.'),
    age: Yup
        .number()
        .typeError('Leeftijd moet een getal zijn.'),
    place: Yup
        .string(),
    email: Yup
        .string()
        .email('Vul een geldig emailadres in.')
        .required('Emailadres is een verplicht veld.'),
    password: Yup
        .string()
        .min(7, ({ min }) => `Wachtwoord moet minstens ${min} karakters bevatten.`)
        .required('Wachtwoord is een verplicht veld.'),
    repeatPassword: Yup
        .string()
        .required('Herhaal wachtwoord is een verplicht veld.')
        .oneOf([Yup.ref('password'), null], 'Wachtwoord komt niet overeen.'),
});

export default registerValidationScheme;