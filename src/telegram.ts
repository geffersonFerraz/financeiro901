import _ from 'lodash';
import TelegramBot from 'node-telegram-bot-api';
import { config } from './config';
import { TelegramService } from './services';


export const TelegramBOT = async () => {

    const token = config.telegramToken;
    const bot = new TelegramBot(token, { polling: true });
   
    await bot.onText(/\//, async (msg: any) => {
        const inputText = msg.text;

        await TelegramService.COMMANDS.forEach(async(item)  => {
            if (item.command == inputText){
                await item.handle(bot, msg)
            }
        })       
    });
}

export default TelegramBOT;