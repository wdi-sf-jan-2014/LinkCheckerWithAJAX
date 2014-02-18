// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .


var Callbacks = (function() {

  var addNewUrlToTable = function(url, httpResponse) {
    // Actually add the url and response code to the table
    $('#siteTable tbody').append("<tr><td><a href="+url+">"+url+"</a></td><td>"+httpResponse+"</tr>");

  };

  var postSuccessHandler = function(response) {
    // Call addNewUrlToTable and insert the results
    // var result = JSON.parse(response);
    var url = response.url;
    var http_response = response.http_response;

    Callbacks.addNewUrlToTable(url ,http_response);

  };

  var postFailureHandler  = function(jqXHR) {
      // The request failed.
      alert("You Got An Error, SON! " + jqXHR.status );
  };

  var createSite = function(url, data) {
    // Make .ajax request here
    $.ajax({ 
      type : 'post', 
      url : url, 
      data : data 
    }).done(postSuccessHandler).fail(postFailureHandler);

  };

  var onSubmitSiteClickHandler =  function() {
    var authParam = $('meta[name=csrf-param]').attr('content');
    var authToken = $('meta[name=csrf-token]').attr('content');
    var site = $('#siteInput').val();
    var data = {};
    data[authParam] = authToken;
    data.url = site; 
    // submit an object that has an object
    data.site = {url: site};

    // We have the site, now call create site
    // to make the request
    Callbacks.createSite("/sites.json", data);

  };

  var removeFromUrlToTable = function(url, httpResponse) {
    // Actually add the url and response code to the table
    $('tr #deleteSite').remove();

  };

  var deleteSuccessHandler = function(response) {
    // Call addNewUrlToTable and insert the results
    // var result = JSON.parse(response);
    var url = response.url;
    var http_response = response.http_response;

    Callbacks.removeFromUrlToTable(url ,http_response);

  };

  var deleteSite = function(url, data) {
    // Make .ajax request here
    $.ajax({ 
      type : 'DELETE', 
      url : url, 
      data : data 
    }).done(deleteSuccessHandler).fail(postFailureHandler);

  };

  var onDeleteSiteClickHandler =  function() {
    var authParam = $('meta[name=csrf-param]').attr('content');
    var authToken = $('meta[name=csrf-token]').attr('content');
    var site = $(this.tr).val();
    var data = {};
    data[authParam] = authToken;
    data.url = site; 
    // submit an object that has an object
    data.site = {url: site};

    // We have the site, now call create site
    // to make the request
    Callbacks.deleteSite("/sites.json", data);

  };

  return {
    postSuccessHandler : postSuccessHandler,


    postFailureHandler : postFailureHandler,

    onSubmitSiteClickHandler : onSubmitSiteClickHandler,
    createSite : createSite,

    addNewUrlToTable : addNewUrlToTable

  };  
})();

$(window).load(function() {
  $("<label>New Site</label><br /><input type=\"text\" id=\"siteInput\"></input><button id=\"checkSite\">Check Site</button>").insertBefore("#siteTable");
  // Adding the onSubmitSiteClickHandler to kick off the ajax
  // request      
  $('#checkSite').click(Callbacks.onSubmitSiteClickHandler);

  // Adding the deletebutton
  $("<button id=\"deleteSite\">Delete</button>").insertAfter("tr td:odd");
  $('#deleteSite').click(Callbacks.onDeleteSiteClickHandler);





});