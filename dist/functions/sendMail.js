"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = sendMail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const messageTemplate_js_1 = require("./messageTemplate.js");
function sendMail(email, url, title, body) {
    const { user, pass } = process.env;
    const [username, repo] = url.split('/').slice(-4);
    var transporter = nodemailer_1.default.createTransport({
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
        html: (0, messageTemplate_js_1.messageTemplate)(username, url, title, body)
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
