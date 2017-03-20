# coding: utf-8
# frozen_string_literal: true
require 'pdf-reader'
require 'doc_ripper'

module Chipotle
  module FileReader
    def convert_file(file)
      DocRipper::rip(file)
    end

    def pdf_to_json(file)
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

    def doc_to_json(file)
      return
    end

    # Just an initial string to save work
    def json_string
      %{ { "title": "Some title",
        "description": "Some description",
        "instructions": "",
        "level": "1",
        "lang": "es",
        "tags": ["tag_one", "tag_two"],
        "status": "1",
        "questions": [
          {
            "status": "1",
            "qtype" : "1",
            "hint" : "Some hint",
            "explanation": "",
            "question": "Some question",
            "answers": [
               { "answer": "Answer one", "correct": "false" },
               { "answer": "Answer two", "correct": "true" }
            ]
         }
        ] }
      }
    end
  end
end

