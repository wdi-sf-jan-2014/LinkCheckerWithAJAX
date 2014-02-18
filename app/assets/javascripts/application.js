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
    $('#siteTable > tbod:last').append('<tr>'+url+'</tr><tr>'+httpResponse+'</tr>');
  };

  var postSuccessHandler = function(responseData) {
      Callbacks.addNewUrlToTable(responseData.url, responseData.http_response);

  };

  var postFailureHandler  = function(jqXHR) {
      alert("This url didn't work! Try again, b'yotch.");
  };

  var createSite = function(url, data) {
    $.ajax({
      type: "post",
      url: url,
      data: data
    }).done(postSuccessHandler);  
  };

  var onSubmitSiteClickHandler =  function() {
    var authParam = $('meta[name=csrf-param]').attr('content');
    var authToken = $('meta[name=csrf-token]').attr('content');

    var site = {  url: $('#siteInput').val(), 
                  http_response: null,
                  authParam: authToken 
                };
    // var siteData; 
    
    // $.get(site.url).done(function(data){ 
    //   siteData = JSON.parse(data); 
    //   site.http_response = siteData.status;
    // });

    Callbacks.createSite("/sites", site);
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