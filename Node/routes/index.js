
/*
 * GET home page.
 */

var parse = require('url').parse;

var soap = require('soap');
var url = 'http://www.xignite.com/xNASDAQLastSale.asmx?WSDL';
var description = 'WSDL not parsed yet...';

soap.createClient(url, function(err, client) {
  
  description = JSON
    .stringify(client.describe(), null, '    ')
    .replace(/\n/g, '<br>')
    .replace(/ /g, '&nbsp;');

});


exports.view = function(req, res) {
  var opts = parse(req.url, true).query;
  var name = opts.name || undefined;
  // make query to webservice
  console.log(name);
  var args = {name: 'value'};
  client.MyFunction(args, function(err, result) {
    console.log(result);
  });
  res.render('index', { title: 'View!', footer: description });
};

exports.index = function(req, res){
  res.render('index', { title: 'Banq', footer: description });
};