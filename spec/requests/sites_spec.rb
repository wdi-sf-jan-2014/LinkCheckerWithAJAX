require 'spec_helper'

describe "Sites" do
	describe "POST /sites" do 
		let(:data){ {site: {url: "example.com"}} }

		it 'redirects when getting wrong parameters with HTML' do
			post '/sites', {:wrong => "stuff"}
			response.should_not be_success
			response.should redirect_to new_site_path
		end

		# this simulates:
		# result = Typhoeus.post("SERVER/sites.json", params: {"site" => {"url" => "example.com"}})
		it 'adds after a format json post' do
			post '/sites.json', data
			response.status.should == 200

			site = Site.where(:url => data[:site][:url]).first
			site.should_not be_nil
			JSON.parse(response.body)["id"].should == site.id
		end

		it 'is a 422 with wrong parameters' do
			post '/sites.json', {:stuff => "wrong"}.to_json, {"CONTENT_TYPE" => "application/json"}
			response.code.should == "422"
			result = JSON.parse(response.body)
			result["error"].should == "param not found: site"
		end
	end

	describe "GET /sites" do
		before do
			@site = Site.create!(:url => "no-links-here.com", http_response: 200)
		end
		it 'returns a json array of urls' do
			get "/sites.json"
			response.should be_success

			jsonResp = JSON.parse(response.body)
			expect jsonResp.length > 0

			JSON.parse(response.body)[0].should include "url" => @site.url
		end
	end

	describe "GET /sites/:id" do
		before do
			@site = Site.create!(:url => "no-links-here.com", http_response: 200)
		end
		it 'gets JSON for a json GET' do
			get "/sites/#{@site.id}.json"
			response.should be_success
			JSON.parse(response.body).should include "url" => @site.url
		end
	end
end
