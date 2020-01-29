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
