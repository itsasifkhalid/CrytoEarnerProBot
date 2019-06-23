export default interface IConfig {
    dev: {
        token: string
        dbUrl: string
        port: number,
        session: {
            name: string,
            secret: string,
            resave: boolean,
            saveUninitialized: boolean,
            cookie: {
                path: string,
                maxAge: number,
                httpOnly: boolean
            }
        }
    },
    prod: {
        token: string
        dbUrl: string
        port: number,
        session: {
            name: string,
            secret: string,
            resave: boolean,
            saveUninitialized: boolean,
            cookie: {
                path: string,
                maxAge: number,
                httpOnly: boolean
            }
        }
    }
}