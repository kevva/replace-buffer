import test from 'ava';
import m from '.';

const buf = (input, ...args) => m(Buffer.from(input), ...args).toString();

test('main', t => {
	t.is(buf('foo bar foo', 'bar', 'foo'), 'foo foo foo');
	t.is(buf('', 'bar', 'foo'), '');
	t.is(buf('foo', '', 'foo'), 'foo');
	t.is(buf('foo', 'bar', ''), 'foo');
	t.is(buf('foo'), 'foo');
	t.is(buf('foo', 'bar'), 'foo');
});

test('function replacement', t => {
	const initNeedle = 'foo';
	const indices = [];

	t.is(
		buf('foo bar baz foo baz', initNeedle, (needle, count, input) => {
			t.is(needle, initNeedle);
			indices.push(count);
			t.true(Buffer.isBuffer(input));
			return `${needle}2`;
		}),
		'foo2 bar baz foo2 baz'
	);

	t.deepEqual(indices, [1, 2]);
});
