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


var inline_template = Handlebars.compile("<tr><td><a href={{url}}> {{url}} </td> <td> {{http}} </td>");

var Callbacks = (function() {

  var addNewUrlToTable = function(url, httpResponse) {
    var context = {url: url, http: httpResponse};
    var html    = inline_template(context);
    // Actually add the url and response code to the tabl

    $('#siteTable').append(html);
  };

  var postSuccessHandler = function(response) {
    // Call addNewUrlToTable and insert the results
    Callbacks.addNewUrlToTable(response.url,response.http_response);

  };

  var postFailureHandler  = function(jqXHR) {
    // The request failed.
    alert("Something went wrong: " + jqXHR);
  };

  var createSite = function(url, data) {
    // Make .ajax request here

    var authParam = $('meta[name=csrf-param]').attr('content');
    var authToken = $('meta[name=csrf-token]').attr('content');

    // Adding the auth params and auth token to the data
    data[authParam] = authToken;

    $.ajax({
      type: "post",
      url: url,
      data: data}).then(postSuccessHandler, postFailureHandler);
  };

  var onSubmitSiteClickHandler =  function() {
      var site = $('#siteInput').val();
      
      // We have the site, now call create site
      // to make the request

      data = {site: {url: site}};
      Callbacks.createSite("/sites.json", data);
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