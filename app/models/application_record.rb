# Chipotle Software (c)  2016-2017 MIT License
# Easier to extend the Base
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
end
