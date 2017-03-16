FactoryGirl.define do
  factory :annal do
    notes "Some notes"
    file Rack::Test::UploadedFile.new(File.open(File.join(Rails.root, '/spec/support/files/some_file.pdf')))
    oname 'some_file.pdf'
    trait :docx_file do
      file Rack::Test::UploadedFile.new(File.open(File.join(Rails.root, '/spec/support/files/some_file.docx')))
    end

  end

end
