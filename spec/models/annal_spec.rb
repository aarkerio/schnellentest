# coding: utf-8
# frozen_string_literal: true
require 'spec_helper'

RSpec.describe Annal, type: :model do

  let(:user)  { FactoryGirl.create :user }

  context 'Save and file' do
    let(:annal) { FactoryGirl.build :annal, user: user }
    let(:annal) { FactoryGirl.build :annal, user: user }
    describe '#saves and converts pdf to text' do
      it 'saves PDF to text' do
        result = annal.save
        p "####  RESULT #################>>>  #{result.inspect}"
        expect(result).to be false
        #expect(annal.content).to eql("Inside file\n\n\f")
      end
    end
  end
end
