module Chipotle
module ApiErrors

  def serialize(errors)
    return if errors.nil?

    json = {}
    new_hash = errors.to_hash(true).map do |k, v|
      v.map do |msg|
        { id: k, title: msg }
      end
    end.flatten
    json[:errors] = new_hash
    json
  end

  def error_code(code)
    erros ={
           code:1,  message: 'General error, please contact the admin',
           code:2,  message: 'Record not found',
           code:3,  message: 'User not authorized',
           code:4,  message: 'File already saved',
           code:5,  message: 'Invalid data',
           code:6,  message: 'Succesfully tested, all looks fine',
           code:7,  message: 'Error: there is a problem with the test fields',
           code:8,  message: 'Error: there is a problem with a question field',
           code:9,  message: 'Error: there is a problem with an answer field',
           code:10, message: 'Error: there is a problem with a multicolumn answer field'
    }
    errors[code]
  end
end
end
