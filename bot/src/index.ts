import Bot from './init/bot'
import Daemon from './init/daemon'
import DB from './init/db'
import Handlers from './init/handlers'
import Middlewares from './init/middlewares'
import Scenes from './init/scenes'
import Server from './api/server'

const bot = Bot.configure() // конфигурируем бот

DB.connect()                // подключаемся к БД

Middlewares.init(bot)       // инициализируем прослойки
Scenes.init(bot)            // инициализируем сцены
Handlers.init(bot)          // инициализируем обработчики
Daemon.init(bot)            // инициализируем демон

Server.init() 				// запускаем сервер api