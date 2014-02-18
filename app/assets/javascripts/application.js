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
       // Make .ajax request here
       // data.http_response = 
       // jQuery.ajax("/sites", {type: "POST", {url: url, data: data});
      // jQuery.ajax(site, {success: function(response){var get_response = response.httpResponse;}})
       jQuery.ajax({type: "post", url: url, data: data}).then(function(){Callbacks.postSuccessHandler();}, function() {Callbacks.postFailureHandler();});

  };

  var addNewUrlToTable = function(url, httpResponse) {
    // Actually add the url and response code to the table
    // jQuery.ajax({url: '/sites', type: 'POST', data: {url: url, http_response: httpResponse}});
      jQuery.ajax('/sites', {type: 'get'}).done('#siteTable').append("<tr><td><a href="+url+">"+url+"</a></td><td>"+httpResponse+"</td></tr>");
  };

  var postSuccessHandler = function(response) {
      // Call addNewUrlToTable and insert the results
      var jsonResp = JSON.parse(response);
      Callbacks.addNewUrlToTable(response.site.url, response.http_response);

  };

  var postFailureHandler  = function(jqXHR) {
      // The request failed.
  };

  var onSubmitSiteClickHandler =  function() {
      var site = $('#siteInput').val();
      
      // We have the site, now call create site
      // to make the request
      var authParam = $('meta[name=csrf-param]').attr('content');
      var authToken = $('meta[name=csrf-token]').attr('content');
      var data = {};
      data[authParam] = authToken;
      data.site = {url: site};

      Callbacks.createSite("/sites", data);
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