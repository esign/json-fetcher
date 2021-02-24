// Code
import 'whatwg-fetch';

export default class JsonFetcher {
  constructor(options) {
    this.options = options;
    this.element = document.querySelector(this.options.element);
    this.template = document.querySelector(this.options.template)
      || this.element.querySelector('.json-fetcher__template');
    this.api = this.options.api || this.element.dataset.api;
    this.keys = this.options.keys || this.element.dataset.keys.split(';');
    if (this.api && this.element && this.template) {
      this.init();
    } else {
      console.error(
        'JsonFetcher error - Element, template or api is not defined',
      );
    }
  }

  init() {
    fetch(this.api)
      .then((res) => res.json())
      .then((res) => {
        this.parseResults(res);
      })
      .catch((error) => {
        this.printError(error);
      });
  }

  parseResults(json) {
    json.data.forEach((item) => {
      const templateClone = this.template.cloneNode(true);
      [...this.keys].forEach((key) => {
        try {
          const keyParts = key.split('.');
          let index = 0;
          let data = item;
          while (index + 1 <= keyParts.length) {
            data = data[keyParts[index]];
            index += 1;
          }
          templateClone.innerHTML = templateClone.innerHTML.replace(
            `__${key}__`,
            data,
          );
        } catch (error) {
          this.printError(error);
        }
      });
      templateClone.innerHTML = templateClone.innerHTML.replace(
        'data-src',
        'src',
      );
      this.element.appendChild(templateClone.children[0]);
    });
    this.template.parentNode.removeChild(this.template);
  }

  printError(error) {
    // eslint-disable-next-line no-console
    console.error(`JsonFetcher error - API: ${this.api}\n${error}`);
  }
}
