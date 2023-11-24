import {signal} from "@preact/signals-react";

//Signal to login token
export const jwtToken = signal('');
//Signal for login window
export const LoginFormOpen = signal(false);
// Signal for register window
export const RegisterFormOpen = signal(false);
// Signal for register success
export const RegisterSuccess = signal(false);
//Signal for delete user
export const delUser = signal(false);