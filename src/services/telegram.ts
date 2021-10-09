import pdfkit from 'pdfkit';
import fs from 'fs';
import moment from 'moment';
import { GroupsService } from '.';
import TelegramBot from 'node-telegram-bot-api';

export const handleSaldo = async (bot: TelegramBot, msg: any) => {
    bot.sendMessage(msg.chat.id, 'Saldo');
    return 'Saldo'
}

export const handleCredito = async (bot: TelegramBot, msg: any) => {
    bot.sendMessage(msg.chat.id, 'Crédito');
    return 'Crédito'
}

export const handleDebito = async (bot: TelegramBot, msg: any) => {
    bot.sendMessage(msg.chat.id, 'Débito');
    return 'Débito'
}

export const handleExtrato = async (bot: TelegramBot, msg: any) => {
    const result = await GroupsService.get(1)
    bot.sendMessage(msg.chat.id, JSON.stringify(result));
    return JSON.stringify(result);
}

export const handlePessoal = async (bot: TelegramBot, msg: any) => {
    const PDFGen = new pdfkit();
    PDFGen.pipe(fs.createWriteStream('teste.pdf'));
    PDFGen.text(`${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
    PDFGen.text('Some awesome example text')
    PDFGen.end();

    const file = './teste.pdf';
    // const parsed = path.parse(file); import path from 'path';
    const stream = fs.createReadStream(file);
    const fileOptions: any = {
        filename: `Extrato_Pessoal_${moment().format('DD-MM-YYYY_h-mm-ss')}.pdf`,
        contentType: 'application/pdf',
    };

    console.log(fileOptions)
    bot.sendMessage(msg.chat.id, `Segue seu PDF: ${fileOptions.filename}`);
    await bot.sendDocument(msg.chat.id, stream, {}, fileOptions);

}

export const handleComandos = async (bot: TelegramBot, msg: any) => {
    let resp = '';
    COMMANDS.forEach(item => {
        resp += `${item.command} - ${item.description}\n`
    })
    bot.sendMessage(msg.chat.id, resp);
    return resp
}

export const COMMANDS = [
    {
        name: 'saldo',
        command: '/saldo',
        description: 'O comando trás xpto',
        descriptionDetail: 'O comando /saldo trás xpto',
        handle: handleComandos
    },
    {
        name: 'credito',
        command: '/credito',
        description: 'O comando trás xpto',
        descriptionDetail: 'O comando /credito trás xpto',
        handle: handleComandos
    },
    {
        name: 'debito',
        command: '/debito',
        description: 'O comando trás xpto',
        descriptionDetail: 'O comando /debito trás xpto',
        handle: handleComandos
    },
    {
        name: 'extrato',
        command: '/extrato',
        description: 'O comando trás xpto',
        descriptionDetail: 'O comando /extrato trás xpto',
        handle: handleComandos
    },
    {
        name: 'saldopessoal',
        command: '/saldopessoal',
        description: 'O comando trás xpto',
        descriptionDetail: 'O comando /saldopessoal trás xpto',
        handle: handleComandos
    },
    {
        name: 'comandos',
        command: '/comandos',
        description: 'O comando trás xpto',
        descriptionDetail: 'O comando /comandos trás xpto',
        handle: handleComandos
    }
]


