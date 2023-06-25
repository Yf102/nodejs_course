import axios from 'axios'
import * as process from 'process'
import { IUser } from 'src/models/user.model'

const apiUrl = 'https://api.brevo.com'
const headers = {
  'api-key': process.env.BREVO_TOKEN,
}

const sendWelcomeEmail = (user: IUser) => {
  const data = {
    sender: {
      name: 'Filip Hristov',
      email: 'senderfilip@example.com',
    },
    to: {
      email: user.email,
      name: user.name,
    },
    subject: 'Welcome to Task Manager App',
    htmlContent: '<html><body><h1>Hello, world!</h1></body></html>',
  }

  axios
    .post(`${apiUrl}/v3/smtp/email`, data, { headers })
    .then((response) => {
      console.log('Email sent successfully')
      console.log(response.data)
    })
    .catch((error) => {
      console.error('Error sending email:', error.response.data)
    })
}

export { sendWelcomeEmail }
