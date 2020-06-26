module Mutations
  class CreateTest < BaseMutation
    # arguments passed to the `resolve` method
    argument :title, String, required: true
    argument :subject_id, Integer, required: true

    # return type from the mutation
    type Types::TestType

    def resolve(title: nil, subject_id: nil)
      game = Test.new(title: title, subject_id: subject_id)
      if test.save
        game
      else
        { id: 0, name: test.errors.full_messages, time: 0 }
      end
    end
  end
end

