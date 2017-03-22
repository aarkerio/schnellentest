# coding: utf-8
# frozen_string_literal: true
require 'spec_helper'

RSpec.describe Annal, type: :model do

  let(:user)  { FactoryGirl.create :user}

  context 'Saves and convert a PDF file' do
    let(:annal) { FactoryGirl.build :annal, user: user }
    describe '#saves file' do
      it 'saves and converts PDF file' do
        annal.save
        annal.reload
        expect(annal.content).to eql("Inside a PDF file\n\n\f")
        expect(annal.json[0..23]).to eql(' { "title": "Some title"')
      end
    end
  end

  context 'Saves and convert a DOCX file' do
    let(:annal) { FactoryGirl.build :annal, :docx_file, user: user }
    describe '#validates checksum' do
      it 'fails to save duplicate PDF file' do
         annal.save
         annal.reload
         expect(annal.content).to eql("Inside DOCX file\n")
         expect(annal.json[0..23]).to eql(' { "title": "Some title"')
      end
    end
  end

  context 'Validation file' do
    let(:annal_1) { FactoryGirl.build :annal, user: user }
    let(:annal_2) { FactoryGirl.build :annal, user: user }
    describe '#validates checksum' do
      it 'fails to save duplicate PDF file' do
        annal_1.save
        result = annal_2.save
        expect(result).to be false
        #expect(annal.content).to eql("Inside file\n\n\f")
      end
    end
  end

  context 'Tests a JSON string to be saved' do
    let(:annal)  { FactoryGirl.build :annal, :docx_file, user: user }
    let(:params) { DummyResponses.json_test }
    describe '#validates checksum' do
      it 'fails to test JSON' do
         p params
         result = annal.test params
         expect(result).to eql true
      end
    end
  end

end
