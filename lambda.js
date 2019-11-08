
//[1]"awslabs/aws-serverless-express", GitHub, 2019. [Online]. Available: https://github.com/awslabs/aws-serverless-express. [Accessed: 18- Oct- 2019].
'use strict'
const awsServerlessExpress = require('aws-serverless-express')
const app = require('./app')
const server = awsServerlessExpress.createServer(app)

exports.handler = (event, context) => { 
    awsServerlessExpress.proxy(server, event, context) 
}