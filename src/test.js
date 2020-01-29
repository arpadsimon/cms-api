import React from 'react'
import CmsApi from './'
import { shallow, configure } from 'enzyme'
import '@testing-library/jest-dom/extend-expect'
import Adapter from 'enzyme-adapter-react-16'

const axios = require('axios')
configure({ adapter: new Adapter() })

jest.mock('axios', () => {
  const examplePage = {
    id: 1,
    title: 'test page',
    meta: {}
  }

  return {
    get: jest.fn(() => Promise.resolve(examplePage))
  }
})

const dummyFuncPage = () => {
  return null
}

const dummyFunc404 = () => {
  return null
}

describe('CmsApi', () => {
  let wrapper

  const props = {
    location: {
      pathname: 'test/test'
    },
    config: {
      apiUrl: 'http://localhost:8000/api/v2/pages/find/?html_path=',
      page: dummyFuncPage,
      page404: dummyFunc404,
      pageTypes: [
        'content.SupportPage'
      ]
    }
  }

  beforeEach(() => {
    wrapper = shallow(<CmsApi {...props} />)
  })
  it('it should renders 404 if there is error', () => {
    wrapper.setState({hasError: true})
    expect(wrapper.find(dummyFunc404)).toHaveLength(1)
  })
  it('it should renders Page if there is no error and model is page', () => {
    wrapper.setState({
      hasError: false,
      isLoading: false,
      data: {
        meta: {
          type: 'content.SupportPage'
        }
      }
    })

    expect(wrapper.find(dummyFuncPage)).toHaveLength(1)
  })
  it('it should renders "loading..." if it is fetching data', () => {
    wrapper.setState({hasError: false, isLoading: true})
    expect(wrapper.find('span.loading-text')).toHaveLength(1)
  })
  it('api call on #componentDidMount', () => {
    wrapper.instance().componentDidMount()
    expect(axios.get).toHaveBeenCalled()
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/api/v2/pages/find/?html_path=test/test')
  })
})
