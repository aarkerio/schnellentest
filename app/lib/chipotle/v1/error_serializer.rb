module Chipotle
module V1
  module ErrorSerializer

    def ErrorSerializer.serialize(errors)
      json = {error: true}

      return json if errors.nil?
      
      new_hash = errors.to_hash(true).map do |k, v|
        v.map do |msg|
          { id: k, title: msg }
        end
      end.flatten
      json[:errors] = new_hash
      json
    end
  end
end
end
