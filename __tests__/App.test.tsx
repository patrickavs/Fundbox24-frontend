import App from '../src/App';

// Note: import explicitly to use the types shipped with jest.
import { expect, it, jest, describe } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

describe('App', () => {
  it('should display "Noch keinen Account bei uns?"', () => {
    render(<App />);

    expect(screen.getByText("Noch keinen Account bei uns?")).toBeTruthy();
  });
});

// it('renderer App has 2 child', () => {
//   const tree = renderer.create(<App />).toJSON();
//   //console.log(JSON.stringify(tree));
//   expect(tree.children.length).toBe(2);
// });
