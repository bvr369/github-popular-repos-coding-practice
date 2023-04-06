import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    queryParameter: languageFiltersData[0].id,
    isLoading: true,
    repos: [],
    isFailed: false,
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    const {queryParameter} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${queryParameter}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const popularRepos = data.popular_repos
      console.log(popularRepos)
      const updatedData = popularRepos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))

      this.setState({repos: updatedData, isLoading: false})
    } else {
      this.setState({isFailed: true})
    }
  }

  updateQueryParameter = id => {
    this.setState({queryParameter: id, isLoading: true})
    this.componentDidMount()
  }

  renderResults = () => {
    const {isFailed, repos} = this.state
    if (isFailed) {
      return (
        <>
          <img
            src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
            alt="failure view"
          />
          <h1>Something Went Wrong</h1>
        </>
      )
    }
    return (
      <ul className="repos-cont">
        {repos.map(each => (
          <RepositoryItem popularRepos={each} key={each.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {queryParameter, isLoading, repos} = this.state
    console.log(repos)

    return (
      <div className="bg-cont">
        <h1>Popular</h1>
        <div className="language-cont">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              details={each}
              key={each.id}
              isActive={each.id === queryParameter}
              updateQueryParameter={this.updateQueryParameter}
            />
          ))}
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {isLoading ? (
            <Loader
              type="ThreeDots"
              width="70"
              height="30"
              color="#0284c7"
              data-testid="loader"
            />
          ) : (
            this.renderResults()
          )}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
