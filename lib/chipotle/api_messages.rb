# coding: utf-8
# frozen_string_literal: true
# Chipotle Software (c) 2016-2017   GPLv3
module Chipotle
module ApiMessages

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

  def self.message_code(code)
    errors = {
           1  =>  'General error, please contact the admin',
           2  =>  'Record not found',
           3  =>  'User not authorized',
           4  =>  'File already saved',
           5  =>  'Invalid data',
           6  =>  'Succesfully tested, all looks fine',
           7  =>  'Error: there is a problem with the test fields',
           8  =>  'Error: there is a problem with a question field',
           9  =>  'Error: there is a problem with an answer field',
           10 =>  'Error: there is a problem with a multicolumn answer field',
           11 =>  'Succesfully exported, all went fine'
    }
    errors[code]
  end
end
end
