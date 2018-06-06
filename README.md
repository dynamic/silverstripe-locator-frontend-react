# SilverStripe Locator React Frontend

[![Build Status](https://travis-ci.org/dynamic/silverstripe-locator-frontend-react.svg?branch=master)](https://travis-ci.org/dynamic/silverstripe-locator-frontend-react)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/dynamic/silverstripe-locator-frontend-react/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/dynamic/silverstripe-locator-frontend-react/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/dynamic/silverstripe-locator-frontend-react/badges/build.png?b=master)](https://scrutinizer-ci.com/g/dynamic/silverstripe-locator-frontend-react/build-status/master)
[![Maintainability](https://api.codeclimate.com/v1/badges/b8ab3bc961aa17e3d4db/maintainability)](https://codeclimate.com/github/dynamic/silverstripe-locator-frontend-react/maintainability)
[![codecov](https://codecov.io/gh/dynamic/silverstripe-locator-frontend-react/branch/master/graph/badge.svg)](https://codecov.io/gh/dynamic/silverstripe-locator-frontend-react)

A frontend made with react, webpack, and SCSS for Dynamic's locator.

## Requirements

 *  SilverStripe 4.0.x or higher
 *  dynamic/silverstripe-locator 3.0.x or higher
 

## Installation

`composer require dynamic/silverstripe-locator-react 1.0.x-dev`

![screen shot](docs/_images/Locator.png)
 
## Documentation

Some customization is done through the locator module. This includes the locator limit and templates for locations. See [the Locator's documentation](https://github.com/dynamic/silverstripe-locator/blob/master/docs/en/index.md)

### Custom Silverstripe Template

There are some caveats when creating a custom template. These do not need to be grouped in a parent container, but custom css is recomended if they are not.

#### Loading Container
The loading container must always be included as this is where the initial react render is done. It must always have a class of `locator-loading`.
```html
<div class="locator-loading"></div>
```

#### Search Container
The search container is optional. It must always have a class of `locator-search`.
```html
<div class="locator-search"></div>
```

#### List Container
The search container is optional. It must always have a class of `locator-search`.
```html
<div class="locator-list"></div>
```

#### Map Container
The map container is optional. It must always have a class of `locator-map`.
```html
<div class="locator-map"></div>
```

## Maintainer Contact

 *  [Dynamic](http://www.dynamicagency.com) (<dev@dynamicagency.com>)
