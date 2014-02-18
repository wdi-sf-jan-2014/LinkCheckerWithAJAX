var Callbacks = (function() {

  var createSite = function(url, data) {
      // Make .ajax request here
  };

  var addNewUrlToTable = function(url, httpResponse) {
    // Actually add the url and response code to the table
  };

  var postSuccessHandler = function(response) {
      // Call addNewUrlToTable and insert the results
      addNewUrlToTable('','');

  };

  var postFailureHandler  = function(jqXHR) {
      // The request failed.
  };

  var onSubmitSiteClickHandler =  function() {
      var site = $('#siteInput').val();
      
      // We have the site, now call create site
      // to make the request
  };
  return {
    postSuccessHandler : postSuccessHandler,


    postFailureHandler : postFailureHandler,

    onSubmitSiteClickHandler : onSubmitSiteClickHandler,
    createSite : createSite,

    addNewUrlToTable : addNewUrlToTable
  };  
})();