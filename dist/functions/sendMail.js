import nodemailer from 'nodemailer';
import { messageTemplate } from './messageTemplate.js';
export function sendMail(email, url, title, body) {
    const { user, pass } = process.env;
    const [username, repo] = url.split('/').slice(-4);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: user,
            pass: pass
        }
    });
    var mailOptions = {
        from: user,
        to: email,
        subject: `New Issue in ${repo}`,
        html: messageTemplate(username, url, title, body)
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return 'error';
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
}
