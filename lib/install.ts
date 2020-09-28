import DOMAssertions from './assertions';

declare global {
  interface Assert {
    dom(target?: string | Element | null, rootElement?: Element): DOMAssertions;
  }
}

export default function (QUnit: QUnit) {
  QUnit.assert.dom = function (
    target?: string | Element | null,
    rootElement?: Element
  ): DOMAssertions {
    if (!isValidRootElement(rootElement)) {
      throw new Error(`${rootElement} is not a valid root element`);
    }

    rootElement = rootElement || this.dom.rootElement || document;

    if (arguments.length === 0) {
      target = rootElement;
    }

    return new DOMAssertions(target, rootElement, this);
  };

  function isValidRootElement(element: any): element is Element {
    return (
      !element ||
      (typeof element === 'object' &&
        typeof element.querySelector === 'function' &&
        typeof element.querySelectorAll === 'function')
    );
  }
}
