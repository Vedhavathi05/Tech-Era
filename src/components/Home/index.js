import {Component} from 'react'

import Loader from 'react-loader-spinner'

import CourseItem from '../CourseItem'

import './index.css'

class Home extends Component {
  state = {
    statusOf: 'INITIAL',
    coursesList: [],
  }

  componentDidMount() {
    this.callApi()
  }

  callApi = async () => {
    this.setState({statusOf: 'PROGRESS'})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updated = data.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))
      console.log(data)
      this.setState({coursesList: updated, statusOf: 'SUCCESS'})
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
    const {coursesList} = this.state
    return (
      <ul>
        <h1>Courses</h1>
        <ul className="ul-container">
          {coursesList.map(each => (
            <li key={each.id}>
              <CourseItem details={each} key={each.id} />
            </li>
          ))}
        </ul>
      </ul>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
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

export default Home
