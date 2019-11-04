'use strict'

module.exports.handler = async (event) => {
  const SERVICE_NAME = process.env.SERVICE_NAME
  console.log('Route hit')
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello from ${SERVICE_NAME}`,
      incomingMessage: JSON.parse(event.body).message,
      input: event
    })
  }
}
