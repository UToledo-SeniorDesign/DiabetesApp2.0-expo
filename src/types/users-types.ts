/**
 * Shared interfaces relating to Users/Patients
 */

export interface IUser {
    first_name: string;
    last_name:  string;
    email:      string;
    img?:       string;
}

export interface IUserLogin {
    // Values needed to login a user, used in the LoginScreen
    email: string;
    password: string;
}

export interface AuthUser extends IUser {
    /**
     * Interface for the response.data for a successful response when signing up a user.
     * This will be used to show and send requests to the backend with verified data.
    */

    id: string;
    token: string;
}