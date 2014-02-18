//= require jquery
//= require jquery_ujs

var Callbacks = (function() {

  var createSite = function(url, data) {
    var authParam = $('meta[name=csrf-param]').attr('content');
    var authToken = $('meta[name=csrf-token]').attr('content');
    $.ajax({
      type: "post",
      url: url,
      data: data}).then(postSuccessHandler, postFailureHandler);
      };


  var addNewUrlToTable = function(url, httpResponse) {
    htmlStr = "<tr><td><a href=\"" + url + "\">" + url + "</td>";
    htmlStr += "<td>" + httpResponse + "</td></tr>";

    $("siteTable").append(htmlStr);
  };


  var postSuccessHandler = function(response) {
      // Call addNewUrlToTable and insert the results
      Callbacks.addNewUrlToTable(response.url , response.http_response);

  };

  var postFailureHandler  = function(jqXHR) {
      // The request failed.
      alert("error!" + jqXHR);
  };

  var onSubmitSiteClickHandler =  function() {
      var site = $('#siteInput').val();
      data = {};
      data = {site: {url: site}};
      // We have the site, now call create site
      // to make the request
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