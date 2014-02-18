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
      //   $.ajax({
      //     type: "POST",
      //     url: url,
      //     data: data }).done(function( response ) ));
      // };
    $.ajax({ type: "post", url: url, data: data });

  };

  var addNewUrlToTable = function(url, httpResponse) {
    // Actually add the url and response code to the table
    // $('#siteTable')
    // .append("<h1>Some HTML</h1>")
        // $('#siteTable');
    // $.append(url, httpResponse);
    // To add newly created sites to the page, first find the table 
    // element using $('#siteTable'), then use .append("<h1>Some HTML</h1>")
    // Pay attention to the alert dialog. Do what it says.
    // $("#siteTable").append($({url: url, httpResponse: httpResponse})
    // <tr><td><a href="amazon.com">amazon.com</a></td><td>301</td></tr>      
      $("#siteTable").append("<td><a href="+ url + ">" + url + "</a></td><td>" + httpResponse + "</td></tr>");
  };

  var postSuccessHandler = function(response) {
      // Call addNewUrlToTable and insert the results
      // f.json { render :json => @sites, only: [:id, :url, :http_response] }
      Callbacks.addNewUrlToTable(response.url, response.http_response);

  };

  var postFailureHandler  = function(jqXHR) {
      // The request failed.
  };

  var onSubmitSiteClickHandler =  function() {
      var site = $('#siteInput').val();
      // To get the auth token on a page, use:
      var authParam = $('meta[name=csrf-param]').attr('content');
      var authToken = $('meta[name=csrf-token]').attr('content');
 
      // To make a request that passes the auth token, do the following:
      var data = {};
      data[authParam] = authToken;

      // Callbacks with CreateSite
      Callbacks.createSite(site,data);


      // Add the function "foo" to the list
      // callbacks.add( site );
      // We have the site, now call create site
      // to make the request
            //       $.post(url,
      // data
      // ).done(function( response )

      // $.post( user,
      //   data
      // ).done(function( response ) {
      //     alert( "Data Saved: " + JSON.stringify(response) );
    };

  var destroySite = function(url, data) {
       // Make .ajax request here
      //   $.ajax({
      //     type: "POST",
      //     url: url,
      //     data: data }).done(function( response ) ));
      // };
    $.ajax({ type: "post", url: url, data: data });

  };


    var removeUrlToTable = function() {
      var site = $('#siteInput').val();
      // To get the auth token on a page, use:
      var authParam = $('meta[name=csrf-param]').attr('content');
      var authToken = $('meta[name=csrf-token]').attr('content');
 
      // To make a request that passes the auth token, do the following:
      var data = {};
      data[authParam] = authToken;

      // Callbacks with CreateSite
      $("#siteTable").empty("<td><a href="+ url + ">" + url + "</a></td><td>" + httpResponse + "</td></tr>");


// $( "button" ).click(function() {
//   $( "p" ).empty();
// });

          // $('a.delete').click (function(){
          //     if(confirm("Are you sure?")){
          //         var row = $(this).closest("tr").get(0);
          //         $.post(this.href, {_method:'delete'}, null, "script");
          //         $(row).hide();
          //         return false;
          //     } else {
          //         //they clicked no.
          //         return false;
          //     }


  // def destroy
  //   @site = Site.find(params[:id])
  //   @site.destroy

  //   respond_to do |f|
  //     f.html { redirect_to sites_path }
  //     f.json { render :json => {}, status: 200}
  //   end

// $.ajax({
//   url: your_url,
//   type: 'DELETE',
//   success: function(result) {
//     // Do something with the result
//   }
// });






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