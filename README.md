# mithril-serializer

[![Build Status](https://travis-ci.com/DiogoDoreto/mithril-serializer.svg?branch=master)](https://travis-ci.com/DiogoDoreto/mithril-serializer)

Mithril serializer plugin for pretty-format

## Examples

```js
test('node with content', () => {
  const vnode = m('div', 'Hello');

  expect(vnode).toMatchInlineSnapshot(`
<div>
  Hello
</div>
`);
});
```

Check our own [test cases](./mithril-serializer.test.js) for more examples.

## How to use

Add this plugin to your devDependencies with:

    npm install --save-dev mithril-serializer

Add the following config to your `jest.config.js` file:

    snapshotSerializers: ['mithril-serializer']

Now Jest is able to pretty print Mithril's vnodes in your snapshots.
