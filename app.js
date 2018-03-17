// require dependencies
var cheerio = require('cheerio');
var request = require('request');
var Knwl = require('knwl.js');
var knwlInstance = new Knwl('english');
knwlInstance.register('dates', require('./node_modules/knwl.js/default_plugins/dates'));

var searchCompany = splitEmailDown('test@gmail.com');
var URL = 'https://www.' + searchCompany + '.co.uk/';
var URLCom = 'https://www.' + searchCompany + '.com/';
var URLhelp = 'https://www.' + searchCompany + '.co.uk/help';
// var URLcontactUs = 'https://www.' + searchCompany + '.co.uk/contactsus';
var URLabout = 'https://www.' + searchCompany + '.co.uk/about';

request(URL, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    var $ = cheerio.load(body);
    // get the page source of the searched company page
    var pageSource = $.html();
    var contactPageExists = pageSource.search('contact');
    console.log(pageSource);
    // var glove = $('a').text();

    // console.log(/(con)\w+/g.exec(glove));
    // var URL_ContactPage = URL + glove;
    // console.log(URL_ContactPage);

    // knwlInstance.init(pageSource);
    // var output = knwlInstance.get('emails');
    // console.log(output);
  } else {
    console.log('-> checking .com address...')
    // if error comes back try URL with .com
    request(URLCom, function (error, response, body) {
      var $ = cheerio.load(body);
      // get the page source of the searched company page
      var pageSource = $.html();
      // console.log(pageSource);
      knwlInstance.init(pageSource);
      var output = knwlInstance.get('emails');
      console.log(output);
    })

  }
});

// Take any email input - emails have to have @ symbol use this to deconstruct the email.
function splitEmailDown(emailInput) {
  //regular expression to split email down to company name
  var companyString;
  var re = /@(\w+)/gi;
  companyString = re.exec(emailInput)[1];

  // console.log(companyString);
  //   //check if email is personal gmail, hotmail, outlook ect
  if (companyString === 'gmail' || companyString === 'hotmail' || companyString === 'outlook') {
    console.log(emailInput + ': Leads to a personal Email provided by - ' + companyString);
    console.log('Input another email address to test');
    return false;
  } else {
    // companyString is the Company Name that is placed inside URL string.
    return companyString;
  }
}













// splitEmailDown('tom@Deerns.com');
// splitEmailDown('test@hotmail.com');
// console.log(searchCompany);
// splitEmailDown('test@gmail.com');