// First import jest-dom which provides the expect assertions
const jestDom = require('@testing-library/jest-dom');

// Then set up TextEncoder/TextDecoder globals
const util = require('util');
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;

// Finally set up window globals if needed
if (typeof window !== 'undefined') {
    window.TextEncoder = global.TextEncoder;
    window.TextDecoder = global.TextDecoder;
}