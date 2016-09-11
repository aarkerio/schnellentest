

import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import QuestionsComponent from '../components/QuestionsComponent';

describe('<QuestionsComponent />', function () {
  it('should have an image to display the gravatar', function () {
    const wrapper = shallow(<QuestionsComponent />);
    expect(wrapper.find('img')).to.have.length(1);
  });

  it('should have props for OneTestArrayProp and QuestionsArrayProp', function () {
    const wrapper = shallow(<QuestionsComponent/>);
  
    expect(wrapper.props().OneTestArrayProp).to.be.defined;
    expect(wrapper.props().QuestionsArrayProp).to.be.defined;
  });
});


