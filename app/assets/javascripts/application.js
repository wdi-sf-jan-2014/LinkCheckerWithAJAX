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

  var createSite = function(url, data) {
       // set authenticity 
       var authParam = $('meta[name=csrf-param]').attr('content');
       var authToken = $('meta[name=csrf-token]').attr('content');
       //var data = {};
       data.authParam = authToken;
       // Make .ajax request here
       $.ajax({
        type: "post",
        url: url,
        data: data
       }).then(Callbacks.postSuccessHandler, Callbacks.postFailureHandler);
  };

  var addNewUrlToTable = function(url, httpResponse) {
    // Actually add the url and response code to the table
    $('#siteTable > tbody:last').append('<tr>url</tr><tr>httpResponse</tr>');
  };

  var postSuccessHandler = function(response) {
      var url = response.url;
      var http_response = response.http_response;
      // Call addNewUrlToTable and insert the results
      Callbacks.addNewUrlToTable(url,http_response);

  };

  var postFailureHandler  = function(jqXHR) {
      // The request failed.
      alert("HTTP Status Code = " + jqXHR.status);
  };

  var onSubmitSiteClickHandler =  function() {
      // We have the site, now call create site
      // to make the request
      // create object of site url and response
      var userUrl = $('#siteInput').val();
      var site_data = {site: {url: userUrl}};  // {url: url, data: data };
        Callbacks.createSite('/sites.json', site_data);
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

});