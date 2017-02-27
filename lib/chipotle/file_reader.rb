# coding: utf-8
# frozen_string_literal: true
require 'pdf-reader'

module Chipotle
  module FileReader
    def convert_file(path)
      file = Read.file(path)
    end

    def pdf_to_txt(file)
      # credits to :
      # 	https://github.com/yob/pdf-reader/blob/master/examples/text.rb
      # usage example:
      # 	ruby pdf2txt.rb /path-to-file/file1.pdf [/path-to-file/file2.pdf..]

	    PDF::Reader.open(filename) do |reader|
	        logger.info "Converting : #{filename}"
	        pageno = 0
	        txt = reader.pages.map do |page|
	      	  begin
	      		  logger.debug "####  var #################>>>  Converting Page #{pageno}/#{reader.page_count}\r"
	      		  page.text
	      	  rescue
	      		  logger.info "Page #{pageno}/#{reader.page_count} Failed to convert"
	      		  ''
	      	  end
	        end # pages map

	        logger.info " >>>>> Writing text to disk"
	    end # reader
      txt
    end

    def doc_to_txt(file)

    end
  end
end

