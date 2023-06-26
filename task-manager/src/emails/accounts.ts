import axios, { AxiosInstance, AxiosResponse } from 'axios'
import * as console from 'console'
import ejs from 'ejs'
import fs from 'fs'
import * as path from 'path'
import CustomError from 'src/errors/CustomError'
import { IUser } from 'src/models/user.model'

type PayloadType = {
  sender: {
    name: string
    email: string
  }
  to: {
    email: string
    name: string
  }[]
  subject: string
  htmlContent: string
}

const SENDER_EMAIL = 'senderfilip@example.com'
const SENDER_NAME = 'Filip Hristov'

export class EmailSender {
  private httpClient: AxiosInstance

  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://api.brevo.com',
      headers: {
        'content-type': 'application/json',
        'api-key': process.env.BREVO_TOKEN,
        accept: 'application/json',
      },
    })
  }

  public sendWelcomeEmail(user: IUser): Promise<AxiosResponse> {
    const emailTemplatePath = path.join(__dirname, 'html', 'welcome-email.html')
    const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8')
    const emailHtml = ejs.render(emailTemplate, { userName: user.name })

    const payload: PayloadType = {
      sender: {
        name: SENDER_NAME,
        email: SENDER_EMAIL,
      },
      to: [
        {
          email: user.email,
          name: user.name,
        },
      ],
      subject: 'Welcome to Task Manager App',
      htmlContent: emailHtml,
    }

    return this.httpClient
      .post('/v3/smtp/email', payload)
      .then((response: AxiosResponse) => {
        console.log('Email sent successfully')
        return response
      })
      .catch((error) => {
        throw new CustomError({
          message: `${error.response.data.code}: ${error.response.data.message}`,
          code: 400,
        })
      })
  }
}
