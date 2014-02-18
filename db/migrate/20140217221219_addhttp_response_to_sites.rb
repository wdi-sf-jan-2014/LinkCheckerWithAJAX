class AddhttpResponseToSites < ActiveRecord::Migration
  def change
    add_column :sites, :http_response, :integer
  end
end
