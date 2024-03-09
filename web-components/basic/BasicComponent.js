class BasicComponent extends HTMLElement {
  constructor(template) {
    super();
    this.attachShadow({ mode: "open" });

    const temp = document.createElement("template");

    temp.innerHTML = template;

    this.shadowRoot.appendChild(temp.content.cloneNode(true));
  }

  addCSSRules(cssText) {
    this.styleSheet.replaceSync(cssText);
  }

  addEventListenerToElement(selector, event, handler) {
    const element = this.shadowRoot.querySelector(selector);
    element.addEventListener(event, handler.bind(this));
  }

  dispatchCustomEvent(
    eventName,
    detail,
    options = {
      bubbles: true,
      composed: true,
    }
  ) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail,
        bubbles: options.bubbles,
        composed: options.composed,
      })
    );
  }
}

export default BasicComponent;
