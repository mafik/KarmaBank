
var soap = require('soap');
var url = 'http://lukaszm.servehttp.com/MainWebService.asmx?WSDL';

var service, setup = function(err, client) {
      if(client) {
	service = client;
	//console.log('WSDL parsed:', client.describe());
	//service = undefined;
	setTimeout(function() { soap.createClient(url, setup); }, 1000*60*15);
      } else {
	console.error("Error:", err);
	soap.createClient(url, setup);
      }
    };

soap.createClient(url, setup);

var url_parse = require('url').parse;

var get_email = function (req) {
      
      var url_parts = url_parse(req.url, true);
      var query = url_parts.query;
      return req.params.user || query.email || undefined;

    };

exports.index = function(req, res){
  res.render('index', { title: 'Karma Bank' });
};

exports.view = function(req, res) {
  
  var email = get_email(req);

  console.log("Quering for", email);
  
  if(!email) {
    res.render('index', { title: 'Karma Bank', error: 'W zapytaniu brakuje adresu email.' });
  } else if(!service) {
    res.render('index', { title: 'Karma Bank', error: 'WSDL nie został jeszcze wczytany. Prawdopodobnie centralny serwer nie odpowiada.' });
  } else {
    service.GetBalance([email], function(err, result) {
      if(err) {
	res.render('index', { title: 'Karma Bank', error: 'Błąd w komunikacji z serwerem:<br>' + err });
      } else {
	console.log('Balance retrieved:', result.GetBalanceResult);
	res.render('index', { title: email, karma: result.GetBalanceResult });
      }
    });
  }
  
};

exports.json = function(req, res) {
  
  var email = get_email(req);

  if(!email) {
    res.send({ error: 'Undefined email.' });
  } else if (!service) {
    res.send({ error: 'WSDL from central server not parsed yet.' });
  } else {
    service.GetBalance([email], function(err, result) {
      if(err) {
	res.send({ error: err });
      } else {
	res.send({ karma: result.GetBalanceResult });
      }
    });
  } 
  
};