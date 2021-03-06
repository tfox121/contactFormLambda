'use strict'

require('dotenv').config()

const AWS = require('aws-sdk')
const ses = new AWS.SES()

module.exports.handler = async (event, context, callback) => {
  console.log('Route hit', event)

  const contactName = JSON.parse(event.body).name
  const firstNameRegex = /(\w+)/
  const firstName = contactName.match(firstNameRegex)[0]

  const contactEmail = JSON.parse(event.body).email
  const contactMessage = JSON.parse(event.body).message

  const todaysDate = new Date().toJSON().slice(0, 10).split('-').reverse().join('/')

  const params = {
    Destination: {
      ToAddresses: [process.env.TO_ADDRESS]
    },
    Message: {
      Body: {
        Text: {
          Data: contactMessage,
          Charset: 'UTF-8'
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Contact Form from Portfolio Site ${todaysDate}`
      }
    },
    ReplyToAddresses: [contactEmail],
    Source: `=?utf-8?B?${Buffer.from(contactName).toString('base64')}?= <${process.env.FROM_ADDRESS}>`
  }

  const response = await ses.sendEmail(params).promise()

  console.log(response)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      message: `Thanks for your message ${firstName}!`
    })
  }
}
