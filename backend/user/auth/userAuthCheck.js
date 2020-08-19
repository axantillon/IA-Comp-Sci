const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

module.exports = userAuthCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-kialml3c.us.auth0.com/.well-known/jwks.json'
}),
audience: 'http://ia-comp-sci.com/user',
issuer: 'https://dev-kialml3c.us.auth0.com/',
algorithms: ['RS256']
});
