import renderer from 'react-test-renderer';
import App from '../src/App';

// Note: import explicitly to use the types shipped with jest.
import {expect, it} from '@jest/globals';
import {render} from '@testing-library/react-native';

it('renders App correctly', () => {
  render(<App />);
});

it('renderer App has 2 child', () => {
  const tree = renderer.create(<App />).toJSON();
  //console.log(JSON.stringify(tree));
  expect(tree.children.length).toBe(2);
});
