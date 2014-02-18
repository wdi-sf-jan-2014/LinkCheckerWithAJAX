# == Schema Information
#
# Table name: sites
#
#  id            :integer          not null, primary key
#  url           :string(255)
#  http_response :integer
#  created_at    :datetime
#  updated_at    :datetime
#

class Site < ActiveRecord::Base
	has_many :links
end
