export default interface IConfig {
    dev: {
        token: string
        dbUrl: string
        port: number,
        api: {
            host: string,
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
        cors: {
            credentials: boolean,
            origin: string[]
        },
        way4pay: {
            merchantAccount,
            percent
        }
    },
    prod: {
        token: string
        dbUrl: string
        port: number,
        api: {
            host: string,
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
        cors: {
            credentials: boolean,
            origin: string[]
        },
        way4pay: {
            merchantAccount,
            percent
        }
    }
}