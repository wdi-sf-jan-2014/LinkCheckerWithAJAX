class SitesController < ApplicationController
  def new
    @site = Site.new
  end

  def index
    @sites = Site.all
    @site = Site.new
    respond_to do |f|
      f.html
      f.json { render :json => @sites, only: [:id, :url, :http_response] }
    end
  end

  def create
    url = params.require(:site)[:url]
    @site = Site.new(url: url)

    response = Typhoeus.get(@site.url)

    @site.http_response = response.response_code

    @site.save
    respond_to do |f|
      f.html { }#redirect_to site_path(@site) }
      f.json { render :json => @site }
    end
  end

  def show
    @site = Site.find(params[:id])
    
    respond_to do |f|
      f.html
      f.json { render :json => @site, only: [:url, :http_response] }
    end
  end

  def destroy
    @site = Site.find(params[:id])
    @site.destroy

    respond_to do |f|
      f.html { redirect_to sites_path }
      f.json { render :json => {}, status: 200}
    end
  end

  rescue_from ActionController::ParameterMissing, :only => :create do |err|
    respond_to do |f|
      f.html do 
        redirect_to new_site_path
      end
      f.json {render :json  => {:error => err.message}, :status => 422}
    end
  end

  # rescue_from ActionController::ParameterMissing, :handle_create_param_missing :only => :create
  #
  # def handle_create_param_missing
  #    respond_to do |f|
  #     f.html do 
  #       redirect_to new_site_path
  #     end
  #     f.json {render :json  => {:error => err.message}, :status => 422}
  #   end
  # #
end
