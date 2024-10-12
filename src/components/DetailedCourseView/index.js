import {Component} from 'react'

import Loader from 'react-loader-spinner'

class DetailedCourseView extends Component {
  state = {
    statusOf: 'INITIAL',
    itemValues: {},
  }

  componentDidMount() {
    this.callApi()
  }

  callApi = async () => {
    this.setState({statusOf: 'PROGRESS'})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        description: data.course_details.description,
        imageUrl: data.course_details.image_url,
      }
      this.setState({itemValues: updatedData, statusOf: 'SUCCESS'})
    } else {
      this.setState({statusOf: 'FAILURE'})
    }
  }

  renderCorrectView = () => {
    const {statusOf} = this.state
    switch (statusOf) {
      case 'PROGRESS':
        return this.renderProgressView()
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderProgressView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {itemValues} = this.state
    const {description, imageUrl, name} = itemValues
    return (
      <div>
        <img src={imageUrl} alt={name} />
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  retry = () => {
    this.callApi()
  }

  render() {
    return <div className="main-container">{this.renderCorrectView()}</div>
  }
}

export default DetailedCourseView
