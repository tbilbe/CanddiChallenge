// require dependencies
var express = require('express');
var cheerio = require('cheerio');
var requestPromise = require('request-promise');
var request = require('request');

var searchCompany = splitEmailDown('test@deerns.com');
var URL = 'https://www.' + searchCompany + '.co.uk';
request(URL, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    var $ = cheerio.load(body);
    // get the page source of the searched company page
    var pageSource = $.html();
    var contactPageExists = pageSource.search('contact');
    console.log(contactPageExists);
  }
});


// take any email input - emails have to have @ symbol and 

function splitEmailDown(emailInput) {
  //regular expression to split email down to company name
  var companyString;
  var re = /@(\w+)/gi;

  companyString = re.exec(emailInput)[1];

  // console.log(companyString);

  //   //check if email is personal gmail, hotmail, outlook ect
  if (companyString === 'gmail' || companyString === 'hotmail' || companyString === 'outlook') {
    console.log(emailInput + ': Leads to a personal Email provided by - ' + companyString);
  } else {
    // console.log('company to search for: ' + companyString);
    return companyString;
  }
}


// splitEmailDown('test@hotmail.com');
// console.log(searchCompany);
// splitEmailDown('test@gmail.com');
// splitEmailDown('tom@Deerns.com');