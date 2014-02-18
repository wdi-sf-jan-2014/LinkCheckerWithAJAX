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
//= requir e jquery_ujs
//= require turbolinks
//= require_tree .
$(window).load(function() {
  $("<label>New Site</label><br /><input type=\"text\" id=\"siteInput\"></input><button id=\"checkSite\">Check Site</button>").insertBefore("#siteTable");

  // Adding the onSubmitSiteClickHandler to kick off the ajax
  // request      
  $('#checkSite').click(Callbacks.onSubmitSiteClickHandler);

});

var Callbacks = (function() {
  
    var createSite = function(url, data) {      
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: postSuccessHandler(),
            failure: postFailureHandler()
        });

    };

      
    var addNewUrlToTable = function(url, httpResponse) {     // Actually add the url and response code to the table
         
        $("#siteTable").append("<td>url</td>", "<td>httpResponse</td>"); 
    };

      
    var postSuccessHandler = function(response) {       // Call addNewUrlToTable and insert the results
              
        addNewUrlToTable('createSite', 'response');

          
    };

      
    var postFailureHandler   = function(jqXHR) {       // The request failed.
          };

      
    var onSubmitSiteClickHandler =    function() {      
        var site = $('#siteInput').val();             // We have the site, now call create site
              
        Callbacks.createSite(url, data); // to make the request
          
    };  
    return {    
        postSuccessHandler: postSuccessHandler,


            postFailureHandler: postFailureHandler,

            onSubmitSiteClickHandler: onSubmitSiteClickHandler,
            createSite: createSite,

            addNewUrlToTable: addNewUrlToTable  
    };  
})();