
var date_diff = require('node-date-diff');
var polish = function() {

      var unitToString = {
            millisecond : ["milisekunda", "milisekundy", "milisekund"],
            second : ["sekunda", "sekundy", "sekund"],
            minute : ["minuta", "minuty", "minut"],
            hour : ["godzina", "godziny", "godzin"],
            day : ["dzień", "dni", "dni"],
            week : ["tydzień", "tygodnie", "tygodni"],
            month : ["miesiąc", "miesiące", "miesięcy"],
            year : ["rok", "lata", "lat"]
          };

      return function(sign, number, unit) {
        
        var format = 2;

        if(number == 1) {
          format = 0;
        }
        
        if(number % 10 == 2 && number % 100 != 12 ) {
          format = 1;
        }

        if (sign == -1) {
          return number + " " + unitToString[unit][format] + " temu";
        } else if(sign == 1) {
          return "Za " + number + " " + unitToString[unit][format];
        }
        
        return "Błąd: kierunek czasu musi być -1 albo 1.";

      };

    }();

var format_diff = date_diff.gen(polish);

var collect = function(collector) {
      var flags = [], i, funcs = Array.prototype.slice.call(arguments, 1);

      for(i=0; i< funcs.length; ++i) {
	flags.push(false);
      }

      for(i=0; i< funcs.length; ++i) {
	(function(index) {

	  funcs[index](function() {
	    flags[index] = true;
	    if(flags.every(function(x) {return x;})) {
	      collector();
	    }
	  });
	  
	})(i);
      }
    };

var soap = require('soap');
var url = 'http://lukaszm.servehttp.com/MainWebService.asmx?WSDL';

var service, setup = function(err, client) {
      if(client) {
	service = client;
	console.log('WSDL parsed:', client.describe());
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

  console.log("Zapytanie HTML o ", email);
  
  if(!email) {
    res.render('index', { error: 'W zapytaniu brakuje adresu email.' });
  } else if(!service) {
    res.render('index', { error: 'WSDL nie został jeszcze wczytany. Prawdopodobnie centralny serwer nie odpowiada.' });
  } else {
    var now = Math.round(Date.now() / 1000);
    var then = now - 3600 * 24 * 30;
    var params = { email: email };
    
    collect(function() {
      res.render('index', params);
    console.log("Zwracam", JSON.stringify(params));
    }, function(done) {
      service.GetHistory({"tns:accountEmail":email, "tns:from":then, "tns:to":now}, function(err, result) {
	if(err) {
	  params.error = err;
	} else {
	  params.history = result.GetHistoryResult[0].HistoryEntry;
          var i, entry, today = new Date();
          for(i in params.history) {
            entry = params.history[i];
            entry.Timestamp = format_diff(entry.Timestamp, today);
          }
	}
	done();
      });
    }, function(done) {
      service.GetBalance({"tns:accountEmail":email}, function(err, result) {
	if(err) {
	  params.error = err;
	} else {
	  params.balance =  result.GetBalanceResult;
	}
	done();
      });
    });
  }
  
};

exports.json = function(req, res) {
  
  var email = get_email(req);
  
  console.log("Zapytanie JSON o", email);

  if(!email) {
    res.send({ error: 'Undefined email.' });
  } else if (!service) {
    res.send({ error: 'WSDL from central server not parsed yet.' });
  } else {
    
    
    var now = Math.round(Date.now() / 1000);
    var then = now - 3600 * 24 * 30;
    var params = { email: email };
    
    collect(function() {
      res.send(params);
      console.log("Zwracam", JSON.stringify(params));
    }, function(done) {
      service.GetHistory({"tns:accountEmail":email, "tns:from":then, "tns:to":now}, function(err, result) {
	if(err) {
	  params.error = err;
	} else {
	  params.history = result.GetHistoryResult[0].HistoryEntry;
	}
	done();
      });
    }, function(done) {
      service.GetBalance({"tns:accountEmail":email}, function(err, result) {
	if(err) {
	  params.error = err;
	} else {
	  params.balance =  result.GetBalanceResult;
	}
	done();
      });
    });
    
  } 
  
};
