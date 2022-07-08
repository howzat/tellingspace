import type {Config} from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
    return {
        testEnvironment: "node",

        // "setupFiles": ["raf/polyfill", "./test/setup.js"]
        verbose: true,
        // The root of your source code, typically /src
        // `<rootDir>` is a token Jest substitutes
        roots: ["<rootDir>/src"],

        // Jest transformations -- this adds support for TypeScript
        // using ts-jest
        transform: {
            '^.+\\.ts?$': 'ts-jest',
            "\\.[jt]sx?$": "babel-jest",
        },

        transformIgnorePatterns: [`node_modules/(?!(gatsby|gatsby-script)/)`],

        // Runs special logic, such as cleaning up components
        // when using React Testing Library and adds special
        // extended assertions to Jest
        setupFilesAfterEnv: [
            // "@testing-library/react/cleanup-after-each",
            // "@testing-library/jest-dom/extend-expect"
        ],

        // Test spec file resolution pattern
        // Matches parent folder `__tests__` and filename
        // should contain `test` or `spec`.
        testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

        // Module file extensions for importing
        moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

    };
};