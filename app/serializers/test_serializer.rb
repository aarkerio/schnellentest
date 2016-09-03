# Chipotle Software (c) 2016 MIT License
class TestSerializer
  attr_reader :test
  
  def all_test(tests)
    tests.collect do |t|
      as_json t
    end
  end
  
  def as_json(test)
    {
        id: test.id.to_s,
        title: test.title,
        description: test.description,
        created: test.created_at.strftime('%F'),
        upated: test.updated_at.strftime('%F'),
        user: test.user_id,
        active: test.active.to_s,
        shared: test.shared.to_s
    }
  end
end

