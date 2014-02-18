
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .


var Callbacks = (function() {

  var createSite = function(url, data) {
      $.ajax({
        type: "post",
        url: url,
        data: data
      }).then(Callbacks.postSuccessHandler);
  };

  var addNewUrlToTable = function(url, httpResponse) {
    // Actually add the url and response code to the table
    $('#siteTable').append('<tr>url</tr><tr>httpResponse</tr>');
  };

  var postSuccessHandler = function(response) {
      var = response.url;
      var = response.httpResponse;
      addNewUrlToTable('url','httpResponse');

  };

  var postFailureHandler = function(jqXHR) {
    return jqXHR.status;
  };

  var onSubmitSiteClickHandler =  function() {
    var authParam = $('meta[name=csrf-param]').attr('content');
    var authToken = $('meta[name=csrf-token]').attr('content');
    var site = $('#siteInput').val();
    var site_data = {site: {url: site}};
        Callbacks.createSite('/sites', site_data);
      };
    });
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