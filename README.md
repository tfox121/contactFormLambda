# contactFormLambda

A simple AWS Lambda function, deployed using Serverless, which listens for POST requests from a contact form and then uses SES to format the form data into an email and sent it to the desired address.

## Install
### Requirements

contactFormLambda is compatible with Node.js 10.16+

You will need to already have an AWS account and AWS CLI set up on your computer, instructions [here](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv1.html).

### On Linux

To install for a single user, clone this repository then:
  ```sh
  $ cd path/to/contactFormLambda
  $ npm install
  ```

### Configuration

  - Create a `.env` file in the project's root directory in which you will need to define the following environment variables:
  ```
  ARN="arn:partition:service:region:account-id:resource-id"
  FROM_ADDRESS="ses-verified-email-address"
  TO_ADDRESS="another-ses-verified-email-address" // this can be the same as the above
  ```

- The correct ARN can be obtained by going to the SES Dashboard and clicking on "Email Addresses" on the left of the page. Then click on the email address which you have chosen as your "FROM_ADDRESS". The ARN will be displayed in the top left of the next screen.

- Check the `serverless.yml` file and ensure that the region is set to the same as your chosen AWS region (make sure SES is available in your region, check [here](https://docs.aws.amazon.com/general/latest/gr/rande.html#ses_region) for an up-to-date list.

### Deployment

- Next deploy the Lambda to AWS using Serverless:
```sh
$ npx sls deploy
```

You will be supplied with an endpoint to use for your contact form POST requests which, once configured, should be forwarded on to your chosen email address.
