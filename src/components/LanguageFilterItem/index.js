// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {details, isActive, updateQueryParameter} = props
  const {id, language} = details

  const activeClass = isActive ? 'active-btn' : ''

  const onClicked = () => {
    updateQueryParameter(id)
  }

  return (
    <button type="button" className={`btn ${activeClass}`} onClick={onClicked}>
      {language}
    </button>
  )
}

export default LanguageFilterItem
