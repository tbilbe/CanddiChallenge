// require dependencies
var cheerio = require('cheerio');
var request = require('request');
var Knwl = require('knwl.js');
var knwlInstance = new Knwl('english');
knwlInstance.register('dates', require('./node_modules/knwl.js/default_plugins/dates'));

var searchCompany = splitEmailDown('test@canddi.com');
var URL = 'https://www.' + searchCompany;

// Optional URL strings where emails and address for contacts could be held?
// var URLhelp = 'https://www.' + searchCompany + '.co.uk/help';
// var URLcontactUs = 'https://www.' + searchCompany + '.co.uk/contactsus';
// var URLabout = 'https://www.' + searchCompany + '.co.uk/about';

request(URL, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    var $ = cheerio.load(body);
    // get the page source of the searched company page
    var pageSource = $.html();
    // console.log(pageSource);

    // knwlInstance.init(pageSource);
    var footer = $('footer').text();
    // console.log(footer);
    knwlInstance.init(footer);
    console.log(JSON.stringify(knwlInstance.get('places')));

    // var outputPhones = knwlInstance.get('phones');
    // var outputLinks = knwlInstance.get('links');
    // var outputEmails = knwlInstance.get('emails');
    // var outputAddress = knwlInstance.get('places');
    // console.log('Output searching for phones: ' + JSON.stringify(outputPhones));
    // console.log('Output searching for links: ' + JSON.stringify(outputLinks));
    // console.log('Output searching for emails: ' + JSON.stringify(outputEmails));
    // console.log('Output searching for addresses: ' + JSON.stringify(outputAddress));
  }
});

// Take any email input - emails have to have @ symbol use this to deconstruct the email.
function splitEmailDown(emailInput) {
  //check if email is personal gmail, hotmail, outlook ect
  console.log(emailInput.toLowerCase().indexOf('gmail'));
  if (emailInput.toLowerCase().indexOf('gmail') > 0 ||
    emailInput.toLowerCase().indexOf('hotmail') > 0 ||
    emailInput.toLowerCase().indexOf('outlook') > 0) {
    console.log(emailInput + ': Leads to a personal Email provided by - ' + companyString);
    console.log('Input another email address to test');
    return false;
  } else {
    var companyString;
    var re = /@(\w+)/gi;
    // updated reg ex to include any type of email domain. -> .co.uk or .com .sexi!
    var re2 = /@(\w+).(\w+).(\w+)/gi;
    companyStringInput = re2.exec(emailInput)[0];
    companyString = companyStringInput.slice(1);
    console.log(companyString);
    // companyString is the Company Name that is placed inside URL string.
    return companyString;
  }
}

// splitEmailDown('tom@Deerns.com');
// splitEmailDown('test@hotmail.com');
// console.log(searchCompany);
// splitEmailDown('test@gmail.com');