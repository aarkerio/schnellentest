# coding: utf-8
# frozen_string_literal: true
require 'pdf-reader'

module Chipotle
  module FileReader
    def convert_file(path)
      file = Read.file(path)
    end

    def pdf_to_txt(file)

    end

    def doc_to_txt(file)

    end
  end
end

