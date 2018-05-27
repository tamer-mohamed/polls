import React from 'react';
import { shallow } from 'enzyme';
import CreateQuestion from '../index';

describe('rendering', () => {
  it('should contain Question and choices fields', () => {
    const actual = getWrapper();

    expect(actual).toMatchSnapshot();
  });
});

describe('callbacks', () => {
  let instance;
  beforeEach(() => {
    instance = getWrapper().instance();
  });
  describe('Add choice', () => {
    it('should increase the number of choices keys', () => {
      instance = getWrapper().instance();

      instance.add();

      const actual = instance.props.form.getFieldValue('keys').length;
      const expected = 3;

      expect(actual).toBe(expected);
    });
  });

  describe('Remove choice', () => {
    it('should remove the key from keys list', () => {
      instance = getWrapper().instance();

      instance.add();
      instance.remove(1);

      const actual = instance.props.form.getFieldValue('keys');
      const expected = [0, 3];

      expect(actual).toEqual(expected);
    });

    it('should remove the key only if  the number of the keys are more than min choices', () => {
      instance = getWrapper().instance();

      instance.remove(1);

      const actual = instance.props.form.getFieldValue('keys');
      const expected = [0, 1];

      expect(actual).toEqual(expected);
    });
  });

  describe('Remove choice', () => {
    xit('Should call questionsService with form values', () => {});
  });
});

function getWrapper() {
  return shallow(<CreateQuestion />).dive();
}
