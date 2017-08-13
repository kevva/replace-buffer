'use strict';
module.exports = (input, needle, replacement) => {
	if (!Buffer.isBuffer) {
		throw new TypeError(`Expected a Buffer, got ${typeof input}`);
	}

	if (!(typeof needle === 'string' && needle.length > 0) || !(typeof replacement === 'string' || typeof replacement === 'function')) {
		return input;
	}

	let matchCount = 0;

	const fn = buf => {
		const index = buf.indexOf(needle);

		if (index === -1) {
			return buf;
		}

		matchCount++;

		const replacer = Buffer.from(typeof replacement === 'string' ? replacement : replacement(needle, matchCount, input));

		const start = buf.slice(0, index);
		const end = fn(buf.slice(index + needle.length));
		const len = index + replacer.length + end.length;

		return Buffer.concat([start, replacer, end], len);
	};

	return fn(input);
};
