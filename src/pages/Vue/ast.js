<div>
  <div className="foo">
    111<div>333</div>
  </div>
  <div className="foo">222</div>
  <div className="foo">
    444<div>{{ dynamic }}</div>
  </div>
  <div className="foo">555</div>
  <div className="foo">666</div>
  <div>{{ dynamic }}</div>
</div>;

// 生成对应 Vue AST树  将静态dom提升，仅处理动态dom

import {
  createElementVNode as _createElementVNode,
  createTextVNode as _createTextVNode,
  toDisplayString as _toDisplayString,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
} from 'vue';

const _hoisted_1 = /*#__PURE__*/ _createElementVNode(
  'div',
  { class: 'foo' },
  [
    /*#__PURE__*/ _createTextVNode('111'),
    /*#__PURE__*/ _createElementVNode('div', null, '333'),
  ],
  -1 /* HOISTED */,
);
const _hoisted_2 = /*#__PURE__*/ _createElementVNode(
  'div',
  { class: 'foo' },
  '222',
  -1 /* HOISTED */,
);
const _hoisted_3 = { class: 'foo' };
const _hoisted_4 = /*#__PURE__*/ _createElementVNode(
  'div',
  { class: 'foo' },
  '555',
  -1 /* HOISTED */,
);
const _hoisted_5 = /*#__PURE__*/ _createElementVNode(
  'div',
  { class: 'foo' },
  '666',
  -1 /* HOISTED */,
);

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock('div', null, [
      _hoisted_1,
      _hoisted_2,
      _createElementVNode('div', _hoisted_3, [
        _createTextVNode('444'),
        _createElementVNode(
          'div',
          null,
          _toDisplayString(_ctx.dynamic),
          1 /* TEXT */,
        ),
      ]),
      _hoisted_4,
      _hoisted_5,
      _createElementVNode(
        'div',
        null,
        _toDisplayString(_ctx.dynamic),
        1 /* TEXT */,
      ),
    ])
  );
}
