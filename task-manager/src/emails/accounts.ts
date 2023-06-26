import axios, { AxiosInstance, AxiosResponse } from 'axios'
import * as console from 'console'
import ejs from 'ejs'
import fs from 'fs'
import * as path from 'path'
import * as process from 'process'
import { BrevoError, BrevoPayloadType } from 'src/@types/Brevo'
import ServerError from 'src/const/server-errors'
import CustomError from 'src/errors/CustomError'
import { IUser } from 'src/models/user.model'

const SENDER_EMAIL = process.env.SENDER_EMAIL || 'sender@example.com'
const SENDER_NAME = process.env.SENDER_NAME || 'Your Name'

export class EmailSender {
  private httpClient: AxiosInstance
  private payload: BrevoPayloadType

  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://api.brevo.com',
      headers: {
        'content-type': 'application/json',
        'api-key': process.env.BREVO_TOKEN,
        accept: 'application/json',
      },
    })

    this.payload = {
      sender: {
        name: SENDER_NAME,
        email: SENDER_EMAIL,
      },
      subject: 'Welcome to Task Manager App',
    }
  }

  public sendWelcomeEmail(user: IUser) {
    const emailTemplatePath = path.join(__dirname, 'html', 'welcome-email.html')
    const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8')
    const emailHtml = ejs.render(emailTemplate, { userName: user.name }) // @ts-ignore

    this.payload.to = [
      {
        email: user.email,
        name: user.name,
      },
    ]
    this.payload.htmlContent = emailHtml

    this.httpClient
      .post('/v3/smtp/email', this.payload)
      .then((response: AxiosResponse) => {
        console.log('Email sent successfully')
        return response
      })
      .catch((error) => {
        if (error.response.data.code in BrevoError) {
          throw new CustomError(ServerError.InternalServerError)
        }

        throw new CustomError({
          message: `${error.response.data.code}: ${error.response.data.message}`,
          code: 400,
        })
      })
  }
}
