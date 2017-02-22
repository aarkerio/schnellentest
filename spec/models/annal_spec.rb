# coding: utf-8
# frozen_string_literal: true
require 'spec_helper'

RSpec.describe Annal, type: :model do

  let(:ha) { FactoryGirl.create :annal }

  context 'convert PDF to text' do
    describe '#saves the searched_links field' do
      let(:params) { ReportResponses.params_links ha.id.to_s }
      it 'parse and save JSON links response' do
        ha.update_report params
        expect(ha.report.searched_links.first[:urls].to_s).to eql(params[:resultados].first[:urls])
      end
    end
  end
end
