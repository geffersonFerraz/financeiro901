import { result } from 'lodash';
import TelegramBot from 'node-telegram-bot-api';
import { config } from './config';
import pdfkit from 'pdfkit';
import fs from 'fs';
import * as path from 'path';

import { GroupsService } from './services';

export const Telegram = () => {

    const token = config.telegramToken;
    const bot = new TelegramBot(token, { polling: true });

    const commands = ['saldo', 'credito', 'debito', 'extrato', 'saldopessoal']

    const handleSaldo = () => {
        return 'Saldo'
    }

    const handleCredito = () => {
        return 'Crédito'
    }    

    const handleDebito = () => {
        return 'Débito'
    }    

    const handleExtrato = async () => {
        const result = await GroupsService.get(1)
        return JSON.stringify(result);
    }

    const handlePessoal = () => {
        // return 'Pessoal'
        const PDFGen = new pdfkit();
        PDFGen.pipe(fs.createWriteStream('teste.pdf'));
        PDFGen.text('Some awesome example text')        
        PDFGen.end();
        return true
    }

    const handleComandos = () => {
        let resp = '';
        commands.forEach(item => {
            resp += `/${item}\n`            
        })
        return resp
    }


    bot.onText(/\/comandos/, (msg: any) => {
        bot.sendMessage(msg.chat.id, handleComandos());
    });

    bot.onText(/\/saldo/, (msg: any) => {
        bot.sendMessage(msg.chat.id, handleSaldo());
    });

    bot.onText(/\/credito/, (msg: any) => {
        bot.sendMessage(msg.chat.id, handleCredito());
    });
    
    bot.onText(/\/debito/, (msg: any) => {
        bot.sendMessage(msg.chat.id, handleDebito());
    });
    
    bot.onText(/\/extrato/, async (msg: any) => {
        bot.sendMessage(msg.chat.id, await handleExtrato());
    });
    
    bot.onText(/\/pessoal/, async (msg: any) => {
        if(handlePessoal()){

            const file = './teste.pdf';
            const parsed = path.parse(file);
            const stream = fs.createReadStream(file);
            const fileOptions: any = {
              filename: parsed.base,
              contentType: 'application/pdf',
            };

            console.log(fileOptions)
            console.log(stream)

            await bot.sendMessage(msg.chat.id, 'Segue PDF:');
            await bot.sendDocument(msg.chat.id, stream, {}, fileOptions);
        }
//https://levelup.gitconnected.com/generating-pdf-in-nodejs-201e8d9fa3d8
    });    

}

export default Telegram;