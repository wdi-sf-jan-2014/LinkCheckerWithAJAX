
var Callbacks = (function() {
  var createSite = function(url, data) {
      // Make .ajax request here
    var authParam = $('meta[name=csrf-param]').attr('content');
    var authToken = $('meta[name=csrf-token]').attr('content');
    data[authParam] = authToken;

    $.ajax({ type: 'post', url: url, data: data }).done(postSuccessHandler).fail(postFailureHandler);
  };

  var addNewUrlToTable = function(url, httpResponse) {
    // Actually add the url and response code to the table
    $('#siteTable').append(url +" "+httpResponse);
  };

  var postSuccessHandler = function(response) {
      // Call addNewUrlToTable and insert the results
      addNewUrlToTable('','');

  };

  var postFailureHandler  = function(jqXHR) {
      // The request failed.
      alert("HTTP Status Code = " + jqXHR.status);
  };

  var onSubmitSiteClickHandler =  function() {
      var site = $('#siteInput').val();
      
      // We have the site, now call create site
      // to make the request
      Callbacks.createSite('http://localhost:3000',site);
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