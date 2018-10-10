const m = require('mithril');

test('empty node', () => {
  const vnode = m('div');

  expect(vnode).toMatchInlineSnapshot(`<div />`);
});

test('node with content', () => {
  const vnode = m('div', 'Hello');

  expect(vnode).toMatchInlineSnapshot(`
<div>
  Hello
</div>
`);
});

test('node with props', () => {
  const vnode = m('div.foo', { class: 'bar', title: 'Test' });

  expect(vnode).toMatchInlineSnapshot(`
<div
  className="foo bar"
  title="Test"
/>
`);
});

test('node with fragment', () => {
  const vnode = m('ul', [[m('li'), m('li')]]);

  expect(vnode).toMatchInlineSnapshot(`
<ul>
  <[>
    <li />
    <li />
  </[>
</ul>
`);
});

test('node with text nodes', () => {
  const vnode = m('div', 'foo', 'bar');

  expect(vnode).toMatchInlineSnapshot(`
<div>
  <#>foo</#>
  <#>bar</#>
</div>
`);
});

test('node with POJO component', () => {
  const Comp = {
    view() {
      return m('div');
    },
  };
  const vnode = m(Comp);

  expect(vnode).toMatchInlineSnapshot(`<m({}) />`);
});

test('node with closure component', () => {
  const Comp = () => ({
    view() {
      return m('div');
    },
  });
  const vnode = m(Comp);

  expect(vnode).toMatchInlineSnapshot(`<Comp />`);
});

test('node with anonymous closure component', () => {
  const vnode = m(function() {
    return {
      view() {
        return m('div');
      },
    };
  });

  expect(vnode).toMatchInlineSnapshot(`<m(fn) />`);
});

test('node with class component', () => {
  class Comp {
    view() {
      return m('div');
    }
  }
  const vnode = m(Comp);

  expect(vnode).toMatchInlineSnapshot(`<Comp />`);
});

test('node with trusted content', () => {
  const vnode = m('div', m.trust("<h1>Here's some <em>HTML</em></h1>"));

  expect(vnode).toMatchInlineSnapshot(`
<div>
  <h1>Here's some <em>HTML</em></h1>
</div>
`);
});
