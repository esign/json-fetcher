# jsonFetcher

NPM package for managing data from an API.

# Installation

## Install package:

```
npm i @esign/json-fetcher
```

## Import package in Javascript file:

```javascript
import JsonFetcher from '@esign/json-fetcher';
```

## Create new JsonFetcher instance:

```javascript
const instance = new JsonFetcher();
```

## Pass options to JsonFetcher class:

```javascript
const instance = new JsonFetcher({
  element: '.js-json-fetcher',
  template: '.js-json-fetcher__template',
  api: API_URL,
  keys: ['url', 'photo'],
});
```

> Replace API_URL with your api url

## Options:

| property | default                        | attribute-way |
| -------- | ------------------------------ | ------------- |
| element  | null                           | /             |
| template | '.js-json-fetcher\_\_template' | /             |
| api      | null                           | 'data-api'    |
| keys     | null                           | 'data-keys'   |
