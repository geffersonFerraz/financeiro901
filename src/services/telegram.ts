import pdfkit from 'pdfkit';
import fs from 'fs';
import moment from 'moment';
import { GroupsService } from '.';
import TelegramBot from 'node-telegram-bot-api';
import path from 'path';

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
    const fileName = `Extrato_Pessoal_${msg.from.first_name}_${moment().format('DD-MM-YYYY_hh-mm-ss')}.pdf`;
    await PDFGen.pipe(fs.createWriteStream(`./pdfs/${fileName}`));
    await PDFGen.text(`${moment().format('MMMM Do YYYY, hh:mm:ss a')}`)
    await PDFGen.text('Some awesome example text')
    await PDFGen.end();

    const stream = fs.createReadStream(`./pdfs/${fileName}`);
    const fileOptions: any = {
        filename: fileName,
        contentType: 'application/pdf',
    };

    console.log(fileOptions)
    await bot.sendMessage(msg.chat.id, `Segue seu PDF: ${fileOptions.filename}`);
    await bot.sendDocument(msg.chat.id, stream, {}, fileOptions);
    await fs.unlinkSync(`./pdfs/${fileName}`)

}

export const handleComandos = async (bot: TelegramBot, msg: any) => {
    let resp = '';
    COMMANDS.forEach(item => {
        resp += `${item.command} - ${item.description}\n`
    })
    bot.sendMessage(msg.chat.id, resp);
    return resp
}

export const handleCadastro = async (bot: TelegramBot, msg: any) => {
    const {id} = await GroupsService.create({name: msg.chat.title, telegramId: msg.chat.id})
    bot.sendMessage(msg.chat.id, `Olá ${msg.from.first_name}, seu grupo *${msg.chat.title}* foi incluido com sucesso.`);
    bot.sendMessage(msg.chat.id, `Id de controle: ${id}`);
    // console.log(msg)
}


export const COMMANDS = [
    {
        name: 'saldo',
        command: '/saldo',
        description: 'O comando trás xpto',
        descriptionDetail: 'O comando /saldo trás xpto',
        handle: handleSaldo
    },
    {
        name: 'credito',
        command: '/credito',
        description: 'O comando trás xpto',
        descriptionDetail: 'O comando /credito trás xpto',
        handle: handleCredito
    },
    {
        name: 'debito',
        command: '/debito',
        description: 'O comando trás xpto',
        descriptionDetail: 'O comando /debito trás xpto',
        handle: handleDebito
    },
    {
        name: 'extrato',
        command: '/extrato',
        description: 'O comando trás xpto',
        descriptionDetail: 'O comando /extrato trás xpto',
        handle: handleExtrato
    },
    {
        name: 'saldopessoal',
        command: '/saldopessoal',
        description: 'O comando trás xpto',
        descriptionDetail: 'O comando /saldopessoal trás xpto',
        handle: handlePessoal
    },
    {
        name: 'comandos',
        command: '/comandos',
        description: 'O comando trás xpto',
        descriptionDetail: 'O comando /comandos trás xpto',
        handle: handleComandos
    },
    {
        name: 'cadastrar',
        command: '/cadastrar',
        description: 'O comando realiza o cadastro do grupo ou usuário.',
        descriptionDetail: 'O comando /cadastrar realiza o cadastro do grupo ou usuário.',
        handle: handleCadastro

    }
]


