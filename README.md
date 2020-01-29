# react-cms-api

> The package makes the connection between the frontend and casino-cms via API and renders the correct component based on the content type.

[![NPM](https://img.shields.io/npm/v/cms-api.svg)](https://www.npmjs.com/package/cms-api) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-cms-api
```

## Usage

```jsx
import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CmsApi from 'cms-api'

const Page = () => (
  <h1>Page</h1>
)

const Page404 = () => (
  <h1>Page 404</h1>
)

const cmsApiConfig = {
  page: Page,
  page404: Page404,
  apiUrl: 'http://example.test/api',
  pageTypes: [
    'blogPage'
  ]
}

class Example extends Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" render={props => <CmsApi config={cmsApiConfig} {...props} />} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Example
```

## License

MIT © [arpadsimon](https://github.com/arpadsimon)
