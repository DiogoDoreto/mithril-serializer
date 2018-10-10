const {
  printChildren,
  printElement,
  printElementAsLeaf,
  printProps,
} = require('pretty-format/build/plugins/lib/markup.js');

const getChildren = element => {
  const { children, text } = element;
  if (text !== undefined) return [text];
  if (!children) return [];
  return Array.isArray(children) ? children : [children];
};

const getType = element => {
  const { tag } = element;

  // if (tag === '<') return 'm.trust';

  if (typeof tag === 'string') return tag;

  if (typeof tag === 'function') {
    return tag.displayName || tag.name || 'm(fn)';
  }

  return 'm({})';
};

const getPropKeys = element => {
  const { attrs } = element;

  if (!attrs) return [];

  return Object.keys(attrs)
    .filter(key => attrs[key] !== undefined)
    .sort();
};

const serialize = (element, config, indentation, depth, refs, printer) => {
  depth++;

  const type = getType(element);

  if (type === '#') {
    config = Object.assign({}, config, { spacingOuter: '', indent: '' });
    indentation = '';
  }

  if (type === '<') {
    return getChildren(element).join();
  }

  if (depth > config.maxDepth) return printElementAsLeaf(type, config);

  return printElement(
    type,
    printProps(
      getPropKeys(element),
      element.attrs,
      config,
      indentation + config.indent,
      depth,
      refs,
      printer,
    ),
    printChildren(
      getChildren(element),
      config,
      indentation + config.indent,
      depth,
      refs,
      printer,
    ),
    config,
    indentation,
  );
};

const mithrilAttrs = [
  'tag',
  'key',
  'attrs',
  'children',
  'text',
  'dom',
  'domSize',
  'state',
  'events',
  'instance',
];

const test = element => {
  if (typeof element !== 'object') return false;

  const keys = Object.keys(element);
  return mithrilAttrs.every(mithrilKey => keys.includes(mithrilKey));
};

module.exports = { serialize, test };
