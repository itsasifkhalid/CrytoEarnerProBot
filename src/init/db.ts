import * as path from 'path'
import mongoose from 'mongoose'
import Logger from './logger.js'

const config = require(path.join(process.cwd(), 'config', 'config.json'));

export default class DB {
    private static url: string

    public static connect(): void {
        // Проверка окружения и смена url базы данных
        this.url = process.env.NODE_ENV === 'production' ? 
                `mongodb://${config.prod.db.host}:${config.prod.db.port}/${config.prod.db.name}` :
                `mongodb://${config.dev.db.host}:${config.dev.db.port}/${config.dev.db.name}`

        // Подключение к базе данных
        mongoose.connect(this.url, { useNewUrlParser: true, keepAlive: true, useCreateIndex: true }, (err: any) => {
            if (err) {
                Logger.fatal(`XXX Возникла ошибка при подключении к MongoDB! Текст ошибки: \n${err.message}`)
                process.exit(1);    // выход из приложения
            } else {
                Logger.trace('>>> База данных подключена')
            }
        })
    }
}