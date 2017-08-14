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
	t.is(buf('foo', 3, 3, {fromIndex: 100}), 'foo');
	t.is(buf('foo', 'foo', 'bar', {fromIndex: -100}), 'bar');
	t.is(buf('foo foo foo foo foo', 'foo', 'bar', {fromIndex: 1}), 'foo bar bar bar bar');
	t.is(buf('bar foo', 'foo', 'bar', {fromIndex: 5}), 'bar foo');

	t.is(
		buf('My friend has a 🐑. I want a 🐑 too!', '🐑', '🦄'),
		'My friend has a 🦄. I want a 🦄 too!'
	);

	t.is(
		buf('foo bar baz foo baz', 'foo', '🦄'),
		'🦄 bar baz 🦄 baz'
	);

	t.is(
		buf('foo bar baz foo baz', 'foo', '🦄', {fromIndex: 5}),
		'foo bar baz 🦄 baz'
	);
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

test('function replacement with fromIndex', t => {
	const initNeedle = 'foo';
	const indices = [];

	t.is(
		buf('foo bar baz foo baz', initNeedle, (needle, count, input) => {
			t.is(needle, initNeedle);
			indices.push(count);
			t.true(Buffer.isBuffer(input));
			return `${needle}2`;
		}, {fromIndex: 5}),
		'foo bar baz foo2 baz'
	);

	t.deepEqual(indices, [1]);
});
