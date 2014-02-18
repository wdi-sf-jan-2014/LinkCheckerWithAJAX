describe("Ajax LinkChecker suite", function() {
  it("works!", function() {
    expect(true).toBe(true);
  });

  describe("Callbacks", function() {
    it("should check that perform create calls ajax", function() {
      var url = "/test";
      var data = {key : "value"};

      spyOn(jQuery, "ajax").and.callFake(function (req) {
        var d = $.Deferred();
        d.resolve(req);
        return d.promise();
      });


      Callbacks.createSite(url, data);

      expect(jQuery.ajax).toHaveBeenCalledWith({
        type: "post",
        url: url,
        data: data
      });
    });
    it("should check that onSubmitSiteClickHandler calls createSite", function() {
      spyOn(Callbacks, "createSite");

      Callbacks.onSubmitSiteClickHandler();

      expect(Callbacks.createSite).toHaveBeenCalled();
    });
    it("should check that postSuccessHandler calls the addNewURLToTable method", function() {
      spyOn(Callbacks, "addNewUrlToTable");

      var responseData = '{"url" : "http://www.myurl.com", "http_response" : 200}';
      var jsonResp = JSON.parse(responseData);
      Callbacks.postSuccessHandler(jsonResp);


      expect(Callbacks.addNewUrlToTable)
        .toHaveBeenCalledWith(jsonResp.url,jsonResp.http_response);
    });
  });

});
