import {signal} from "@preact/signals-react";

//Signaali kirjautumistokenille
export const jwtToken = signal('');
//Signaali onko kirjautumisikkuna auki vai ei
export const LoginFormOpen = signal(false);
// Signaali rekisteröitymisikkunalle
export const RegisterFormOpen = signal(false);