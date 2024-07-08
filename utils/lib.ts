import { SessionOptions } from "iron-session";

export interface SessionData {
    username?: string;
    token?: string;
    isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
    isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
    password: "uNN{&>(p._,WRmG3O1D!0$80#N!5OI&R32423hhsfhj",
    cookieName: "yo_auction_seller_secrets",
    cookieOptions: {
        httpOnly: true,
        secure: false,
    },
};
