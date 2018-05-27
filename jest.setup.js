import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({
  adapter: new Adapter(),
  disableLifecycleMethods: true, // TODO: to discuss how to refactor tests without this behavoir: http://airbnb.io/enzyme/docs/guides/migration-from-2-to-3.html#lifecycle-methods
});

/**
 * apply matchMedia if not defined
 * @see https://github.com/akiran/react-slick/issues/93#issuecomment-258502735
 * */

window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };
