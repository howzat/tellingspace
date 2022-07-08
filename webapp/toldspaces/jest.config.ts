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
            // https://www.gatsbyjs.com/docs/how-to/testing/unit-testing/#mocking-gatsby
            "^.+\\.jsx?$": `<rootDir>/jest-preprocess.js`,
        },

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

        moduleNameMapper: {
            '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
            '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
            '^gatsby-page-utils/(.*)$': 'gatsby-page-utils/$1', // Workaround for https://github.com/facebook/jest/issues/9771
            "^gatsby-core-utils/(.*)$": `gatsby-core-utils/dist/$1`, // Workaround for https://github.com/facebook/jest/issues/9771
            "^gatsby-plugin-utils/(.*)$": [
                `gatsby-plugin-utils/dist/$1`,
                `gatsby-plugin-utils/$1`,
            ], // Workaround for https://github.com/facebook/jest/issues/9771
        },
        testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
        transformIgnorePatterns: [`node_modules/(?!(gatsby|gatsby-script)/)`],
        setupFiles: [`<rootDir>/loadershim.js`],
    };
};

