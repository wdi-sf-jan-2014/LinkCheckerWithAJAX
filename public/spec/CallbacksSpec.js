describe("Ajax LinkChecker suite", function() {
  var url = ["www.example.com"], ajax = jasmine.createSpy('ajax');

  it("works!", function() {
    expect(true).toBe(true);
  });

  describe("Callbacks", function() {
    it("should check that perform create calls ajax", function() {
     
      spyOn(jQuery, "ajax");

      var url = "/test";
      var data = {key : "value"};
      Callbacks.createSite(url, data);

      expect(jQuery.ajax).toHaveBeenCalledWith({
        type: "POST",
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
      Callbacks.postSuccessHandler(responseData);

      jsonResp = JSON.parse(responseData);
      expect(Callbacks.addNewUrlToTable).toHaveBeenCalledWith(jsonResp.url, jsonResp.http_response
      );
    });
  });

});
