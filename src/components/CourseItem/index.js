import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {details} = props
  const {name, id, logoUrl} = details
  return (
    <div className="course-item">
      <Link to={`/courses/${id}`} className="link">
        <img src={logoUrl} alt={name} className="logo-styling" />
        <p className="heading">{name}</p>
      </Link>
    </div>
  )
}

export default CourseItem
