import ReactTestRenderer from 'react-test-renderer';

import htmlToDomTree from '../htmlToDomTree';
import renderHtmlChildren from '../renderHtmlChildren';

const htmlToJson = (html) =>
  ReactTestRenderer.create(renderHtmlChildren({
    childrenNodes: htmlToDomTree(html)
  })).toJSON();

describe('renderHtmlChildren', () => {
  test('text renders as <Text />', () => {
    const rendered = htmlToJson('hello');
    expect(rendered.type).toBe('Text');
  });

  test('empty "div" renders as <View /> and no children', () => {
    const rendered = htmlToJson('<div />');
    expect(rendered.type).toBe('View');
    expect(rendered.children).toBe(null);
  });

  test('an "a" renders as <View /> with an onPress handler', () => {
    const rendered = htmlToJson('<a />');
    expect(rendered.props.onPress).toBeDefined();
  });

  test('a link is rendered as a <View> with <Text /> inside', () => {
    const rendered = htmlToJson('<a>Link text</a>');
    expect(rendered.type).toBe('View');
    expect(rendered.children[0].type).toBe('Text');
    expect(rendered.children[0].children).toEqual(['Link text']);
  });
});