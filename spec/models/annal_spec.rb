# coding: utf-8
# frozen_string_literal: true
# Chipotle Software 2016-2018 (c) MIT License
require 'spec_helper'

# Tip: build_stubbed is faster than build and reduces dependency on DB.

RSpec.describe Annal, type: :model do

  let(:user)  { FactoryBot.create :user}

  context 'Saves and convert a PDF file' do
    let(:annal) { FactoryBot.build :annal, user: user }
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
    let(:annal) { FactoryBot.build :annal, :docx_file, user: user }
    describe '#validates checksum' do
      it 'fails to save duplicate PDF file' do
         annal.save
         annal.reload
         expect(annal.content).to eql("Inside DOCX file\n")
         expect(annal.json[0..23]).to eql(' { "title": "Some title"')
      end
    end
  end

  context 'Validation file fails because duplicated checksum' do
    let(:annal_1) { FactoryBot.build :annal, user: user }
    let(:annal_2) { FactoryBot.build :annal, user: user }
    describe '#validates checksum' do
      it 'fails to save duplicate PDF file' do
        annal_1.save
        result = annal_2.save
        expect(result).to be false
      end
    end
  end

  context 'New JSON test quiz string fails to be saved because wrong formed test' do
    let(:annal)  { FactoryBot.build :annal, :docx_file, user: user }
    let(:params) { DummyResponses.json_test(false, true) }
    describe '#validates test JSON' do
      it 'fails to validates JSON' do
        result = annal.verify_or_save(params, user.id)
        expect(result).to eql 7
      end
    end
  end

  context 'JSON string fails to be saved because wrong formed question' do
    let(:annal)  { FactoryBot.build :annal, :docx_file, user: user }
    let(:params) { DummyResponses.json_test(false, false, true) }
    describe '#validates JSON questions' do
      it 'fails to questions JSON' do
        result = annal.verify_or_save(params, user.id)
        expect(result).to eql 8
      end
    end
  end

  context 'JSON answer string to be saved fails because wrong formed answer' do
    let(:annal)  { FactoryBot.build_stubbed :annal, :docx_file, user: user }
    let(:params) { DummyResponses.json_test(false, false, false, true) }
    describe '#validates JSON answers' do
      it 'fails to questions JSON' do
        result = annal.verify_or_save(params, user.id)
        expect(result).to eql 9
      end
    end
  end

  context 'JSON string fails because is not JSON valid' do
    let(:annal)  { FactoryBot.build_stubbed :annal, :docx_file, user: user }
    let(:params) { DummyResponses.json_test(true) }
    describe '#validates JSON' do
      it 'fails to test JSON' do
        result = annal.verify_or_save(params, user.id)
        expect(result).to eql 1
      end
    end
  end

  context 'New quiz test is verified succesfully but not saved ' do
    let(:annal)  { FactoryBot.build_stubbed :annal, :docx_file, user: user }
    let(:params) { DummyResponses.json_test }
    describe '#validates JSON string without problem' do
      it 'JSON is OK' do
        result = annal.verify_or_save(params, user.id)
        expect(result).to eql 6
      end
    end
  end

  context 'New quiz test is saved succesfully' do
    let(:annal)  { FactoryBot.build :annal, :docx_file, user: user }
    let(:params) { DummyResponses.json_test }
    describe '#saves JSON string without problem' do
      it 'JSON is OK, new test created' do
        result = annal.verify_or_save(params, user.id, true)
        expect(result).to eql 11
        annal.reload
        expect(annal.done).to eql true
      end
    end
  end

end
