/**
 * Shared interfaces relating to Users/Patients
 */

export interface IUser {
    first_name: string;
    last_name:  string;
    email:      string;
    phone:      string;
    img:        string;
}

export interface IUserLogin {
    // Values needed to login a user, used in the LoginScreen
    email: string;
    password: string;
}