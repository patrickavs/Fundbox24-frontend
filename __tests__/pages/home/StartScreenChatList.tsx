import App from '../src/App';

import { expect, it, jest, describe } from '@jest/globals';
import { render, screen } from '@testing-library/react-native'
import StartScreen from "../../../src/pages/home/StartScreen.tsx";

describe('App', () => {
    it('should display three ChatItems"', () => {
        render(<StartScreen />);

        const chatItems = screen.queryAllByTestId('chat-item');
        expect(chatItems.length).toBe(3);
    });
});