var restify = require('restify');
var fs = require('fs');
var Habitat = require('habitat');

Habitat.load();

var env = new Habitat();
var server = restify.createServer({
  name: 'webmaker-profile-service',
  version: '1.0.0'
});

var port = env.get('PORT') || 8080;

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());
server.use(restify.fullResponse());

server.get('/user-data/:username', function (req, res, next) {
  var userData = fs.readFileSync('fake.json', {
    encoding: 'utf8'
  });
  userData = JSON.parse(userData);

  res.send(userData);
});

server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url);
});

//test
