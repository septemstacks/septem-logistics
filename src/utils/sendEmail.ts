import formData from 'form-data';
import MailGun from 'mailgun.js';
// @ts-ignore
const mailgun = new MailGun(formData);

interface Variables {
    [key: string]: string;
}

interface Message {
    to: string | string[];
    subject: string;
    variables?: Variables;
    template?: string;
    html?: string;
    attachment?: File
}

export const sendEmail = async (message: Message) => {
    const mg = mailgun.client({
        username: 'api',
        key: process.env.MAILGUN_API_KEY!,
        url: process.env.MAILGUN_API_URL,
    });
    await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
        from: process.env.MAILGUN_SENDER_EMAIL,
        to: message.to,
        subject: message.subject,
        template: message.template!,
        // text,
        html: message.html,
        attachment: message.attachment,

        'h:X-Mailgun-Variables': JSON.stringify(message.variables)
    });
    console.log(`Email sent to ${message.to}`);
};