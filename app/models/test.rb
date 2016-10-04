# Chipotle Software (c) 2016 MIT License

class Test < ApplicationRecord
  belongs_to :user
  has_many :test_question, -> { order(:order) }
  has_many :question, through: :test_question

  validates :title, presence: true
  
  def create_test(params)
    create_params = order_params params
    #logger.debug create_params.inspect
    test = Test.new create_params
    test.save
  end

  # Get one test ans its questions  
  def get_one
    serialize_test
  end
  
  # Returns all questions by subject or tag 
  def search(terms)
    # SELECT id, question FROM questions WHERE searchtext @@ 'lorem' AND NOT EXISTS( SELECT question_id FROM tests_questions WHERE test_id=1);
    # SELECT q.id, q.question FROM questions AS q WHERE q.searchtext @@ 'lorem' AND NOT EXISTS(SELECT q1.id FROM test_questions AS tq, questions AS q1 WHERE tq.question_id=q1.id AND tq.test_id=1);   
    sanitized = ActiveRecord::Base.send(:sanitize_sql_array, ["to_tsquery('english', ?)", terms.gsub(/\s/,"+")])
    # logger.debug "sanitized #################>>>  #{sanitized.inspect}"
    Question.where("searchtext @@ #{sanitized} AND id NOT IN(SELECT question_id AS id FROM test_questions WHERE test_id=#{id})").select(:id, :question, :explanation, :hint, :tags, :qtype).limit(20)
  end

  def link_questions(question_ids) 
    results = question_ids.map do |qid|
      # logger.debug " qid >>>>>> #{ qid['question_ids'] } 
      TestQuestion.find_or_create_by(test_id: id, question_id: qid['question_ids'])
    end
    results.include? false
  end

  def reorder(params)
    tq = test_question.where(question_id: params[:question_id].to_i).first
    if params[:way] == 'down'
      tq_up = tq.next
      tq.update_attribute order: tq_up.order
      tq_up.update_attribute order: tq.order 
    else
      tq_down = tq.previous
      tq.update_attribute order: tq_down.order
      tq_down.update_attribute order: tq.order 
    end
    true
  end

  private

  # Private: Order a new test hash.
  #
  # appo_id - The Integer number of appointemnt id.
  #
  # Returns hash object or nil.
  def order_params(params)
    { title:       params['title'],
      description: params['description'],
      tags:        params['tags'],
      active:      params['active'],
      shared:      params['shared'],
      user_id:     params['user_id']
    }
  end

  # Private
  # Serialize a test ans its questions
  # Returns Hash.
  def serialize_test
    all               = Hash.new
    all[:title]       = title
    all[:description] = description
    all[:id]          = id
    all[:questions]   = []
    question.select(:id, :question, :hint, :explanation, :tags, :qtype, :active, :lang, :worth, :status).each do |q|
      all[:questions] << q 
    end
    all
  end

end
