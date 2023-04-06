// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {popularRepos} = props
  const {
    name,
    id,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = popularRepos

  return (
    <li className="list-item">
      <img src={avatarUrl} className="avatar-img" alt={name} />
      <h1>{name}</h1>
      <div className="list-item-stats-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="list-item-stats-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="list-item-stats-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
