// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Polyfill for crypto.getRandomValues in jsdom/Jest environment
// Editor.js uses crypto.getRandomValues; jsdom may not provide it.
if (typeof globalThis.crypto === 'undefined') {
	// Use Node's crypto to fill a typed array
	const { randomFillSync } = require('crypto');
	globalThis.crypto = {
		getRandomValues: (arr) => {
			// randomFillSync works with Buffer/Uint8Array
			const buf = Buffer.alloc(arr.length);
			randomFillSync(buf);
			for (let i = 0; i < arr.length; i++) arr[i] = buf[i];
			return arr;
		},
	};
}
