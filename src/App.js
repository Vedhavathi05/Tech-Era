import {Component} from 'react'

import {Switch, Route} from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'
import DetailedCourseView from './components/DetailedCourseView'
import NotFound from './components/NotFound'

import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/courses/:id" component={DetailedCourseView} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default App
