import axios, { AxiosInstance, AxiosResponse } from 'axios'
import * as console from 'console'
import ejs from 'ejs'
import fs from 'fs'
import * as path from 'path'
import * as process from 'process'
import { BrevoError, BrevoPayloadType } from 'src/@types/Brevo'
import ServerError from 'src/const/server-errors'
import { IUser } from 'src/db/models/user.model'
import CustomError from 'src/errors/CustomError'

const SENDER_EMAIL = process.env.SENDER_EMAIL || 'sender@example.com'
const SENDER_NAME = process.env.SENDER_NAME || 'Your Name'

export class EmailSender {
  private httpClient: AxiosInstance
  private payload: BrevoPayloadType
  private user: IUser

  constructor(user: IUser) {
    this.httpClient = axios.create({
      baseURL: 'https://api.brevo.com',
      headers: {
        'content-type': 'application/json',
        'api-key': process.env.BREVO_TOKEN,
        accept: 'application/json',
      },
    })

    this.user = user

    this.payload = {
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
    }
  }

  public sendWelcomeEmail = async () => {
    const emailTemplatePath = path.join(__dirname, 'html', 'welcome-email.html')
    const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8')

    this.payload.subject = 'Welcome to Task Manager App'
    this.payload.htmlContent = ejs.render(emailTemplate, {
      userName: this.user.name,
      senderName: SENDER_NAME,
    })

    await this.send()
  }

  public sendGoodByEmail = async () => {
    const emailTemplatePath = path.join(__dirname, 'html', 'goodbyе-email.html')
    const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8')
    const emailHtml = ejs.render(emailTemplate, {
      userName: this.user.name,
      senderName: SENDER_NAME,
    })

    this.payload.subject = 'Account Deletion Confirmation'
    this.payload.htmlContent = emailHtml

    await this.send()
  }

  private send = async () => {
    if (process.env.NODE_ENV !== 'production') return
    return this.httpClient
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
