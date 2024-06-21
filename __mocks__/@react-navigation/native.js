jest.mock('@react-navigation/native', () => {
    return {
        ...jest.requireActual('@react-navigation/native'),
        useNavigation: () => ({
            navigate: jest.fn(),
            goBack: jest.fn(),
            setOptions: jest.fn(),
        }),
        useRoute: () => ({
            params: {
                // Default params that you can override in your tests
                myObject: { id: 1, name: 'Test Object' },
            },
        }),
    };
});
