import { waitForText } from "../utils/waitForText.js"
import db from '../db/db.json' with {type: "json"}
import * as fs from 'fs'
import {config} from 'dotenv'

config({path: "../modules/.env"})

export async function getCredit(bot, msg){
    await bot.sendMessage(msg.message.chat.id, "Пришли мне ФИО")
    const fio = await waitForText(bot, msg.message.chat.id)
    await bot.sendMessage(msg.message.chat.id, "Пришлите мне ваш номер")
    const phone = await waitForText(bot, msg.message.chat.id)
    await bot.sendMessage(msg.message.chat.id, "Пришлите мне вашу почту")
    const email = await waitForText(bot, msg.message.chat.id)

    db.push({
        fio: fio,
        phone: phone,
        email: email
    })

    fs.writeFileSync('./assets/db/db.json', JSON.stringify(db, null, '\t'))
    await bot.sendMessage(msg.message.chat.id, `ФИО: ${fio}\nНомер телефона: ${phone}\nПочта: ${email}`) 
    await bot.sendMessage(process.env.CHATID, `ФИО: ${fio}\nНомер телефона: ${phone}\nПочта: ${email}`)
}