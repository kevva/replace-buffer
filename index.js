'use strict';
module.exports = (input, needle, replacement, opts) => {
	if (!Buffer.isBuffer(input)) {
		throw new TypeError(`Expected a \`Buffer\`, got \`${typeof input}\``);
	}

	if (!(typeof needle === 'string' && needle.length > 0) || !(typeof replacement === 'string' || typeof replacement === 'function')) {
		return input;
	}

	opts = Object.assign({fromIndex: 0}, opts);

	let matchCount = 0;

	const fn = buf => {
		const fromIndex = matchCount === 0 ? opts.fromIndex : 0;
		const index = buf.indexOf(needle, fromIndex);

		if (index === -1) {
			return buf;
		}

		matchCount++;

		const replacementBuf = Buffer.from(typeof replacement === 'string' ? replacement : replacement(needle, matchCount, input));
		const needleBuf = Buffer.from(needle);
		const start = buf.slice(0, index);
		const end = fn(buf.slice(index + needleBuf.length));
		const len = index + replacementBuf.length + end.length;

		return Buffer.concat([start, replacementBuf, end], len);
	};

	return fn(input);
};
