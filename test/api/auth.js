process.env.NODE_ENV = 'development';

const chai = require('chai');

const chai_http = require('chai-http');

const server = require('./../../server');
const User = require('./../../app/models/user');

