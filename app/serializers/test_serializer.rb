
class TestSerializer
  attr_reader :test

  def initialize(test)
    @test = test
  end

  def as_json
    {
      test: {
        id: test.id.to_s,
        type: 'test',
        attributes: {
          questions: test.title
        }
      }
    }
  end
end

