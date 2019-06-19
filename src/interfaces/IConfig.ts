export default interface IConfig {
    dev: {
        token: string
        dbUrl: string
        port : number
    },
    prod: {
        token: string
        dbUrl: string
        port: number
    }
}