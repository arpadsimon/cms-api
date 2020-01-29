import React, {PureComponent} from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

class CmsApi extends PureComponent {
  constructor() {
    super()

    this.state = {
      hasError: false,
      data: null,
      isLoading: true
    }
  }

  componentDidMount() {
    const { pathname } = this.props.location;

    const url = this.props.config.apiUrl + pathname

    return axios.get(url).then(res => {
      this.setState({data: res.data, isLoading: false})
    }).catch(error => {
      this.setState({hasError: true})
    })
  }

  render() {
    const { config } = this.props

    const Page404 = config.page404
    const Page = config.page

    if (this.state.hasError) {
      return <Page404 />
    }

    const { isLoading, data } = this.state

    let component

    if (data && config.pageTypes.includes(data.meta.type)) {
      component = <Page data={data} />
    } else {
      component = <Page404 />
    }

    return (isLoading) ? <span className='loading-text'>Loading...</span> : component
  }
}

CmsApi.propTypes = {
  location: PropTypes.object.isRequired,
  config: PropTypes.shape({
    page: PropTypes.func.isRequired,
    page404: PropTypes.func.isRequired,
    apiUrl: PropTypes.string.isRequired,
    pageTypes: PropTypes.array.isRequired
  })
}

export default CmsApi
