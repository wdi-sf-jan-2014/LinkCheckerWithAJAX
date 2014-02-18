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

$(window).load(function() {
  var authParam = $('meta[name=csrf-param]').attr('content');
  var authToken = $('meta[name=csrf-token]').attr('content');
  var text_field = $('<input id="form-text-field" ></input>' );
  var submit = $('<input type="submit" value="Create Site"></input>');
  var addedSiteId = 0;
  $('#form-div').append(text_field);
  $('#form-div').append(submit);
  submit.click(function(self){
    var data = {};
    data[authParam] = authToken;
    data.site = {'url' : $('#form-text-field').val()};
    $.post("/sites.json", data)
    .done(function( response ) {
        //console.log(response);
        //var res = JSON.parse(response);
       console.log(response);
        $('#siteTable').append('<tr><td><a href="' + response.url + '">' + response.url + '</a></td><td>' + response.http_response + '</td></tr>');
      })
     .fail(function(jqXHR) {
        alert( "Error");
     });
 });
  

});