

import nodemailer from 'nodemailer'
import { envConfig } from '../config/config'

interface IMailData {
    to: string,
    subject: string,
    text: string
}

const sendMail = async (data: IMailData) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: envConfig.email,
            pass: envConfig.emailPassword
        }
    })

    const mailOptions = {
        from: `Digital Dookan <${envConfig.email}>`,
        to: data.to, // recipient email will be set when sending mail
        subject: data.subject,
        text: data.text
    }

    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error)
    }
}

export default sendMail