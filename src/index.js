// Code
import 'whatwg-fetch';

export default class JsonFetcher {
  constructor(element) {
    this.element = element;
    this.template = element.querySelector('.json-fetcher__template');
    this.api = element.dataset.api;
    this.keys = element.dataset.keys.split(';');
    this.init();
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
      this.keys.forEach((key) => {
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
