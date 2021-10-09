import _ from 'lodash';
import TelegramBot from 'node-telegram-bot-api';
import { config } from './config';
import { TelegramService } from './services';


export const TelegramBOT = () => {

    const token = config.telegramToken;
    const bot = new TelegramBot(token, { polling: true });
   
    bot.onText(/\//, async (msg: any) => {
        const inputText = msg.text;

        TelegramService.COMMANDS.forEach(async item => {
            if (item.command == inputText){
                await item.handle(bot, msg)
            }
        })       
    });
}

export default TelegramBOT;