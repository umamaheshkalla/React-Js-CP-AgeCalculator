import {Component} from 'react'

import './index.css'

class AgeCalculator extends Component {
  state = {
    yearOfBirth: '',
    showError: false,
    showResult: false,
  }

  setIsResultVisible = value => {
    this.setState({showResult: value})
  }

  setIsErrorOccurred = value => {
    this.setState({showError: value})
  }

  getCalculatedAge = () => {
    const {yearOfBirth} = this.state
    const dateOfBirth = new Date(yearOfBirth)
    const dateOfBirthYear = dateOfBirth.getFullYear()

    const presentDate = new Date()
    const presentDateYear = presentDate.getFullYear()

    return presentDateYear - dateOfBirthYear
  }

  getCalculatedAgeText = () => {
    const calculatedAge = this.getCalculatedAge()

    if (calculatedAge === 1) {
      return `You are ${calculatedAge} year old by the end of 2021`
    }
    return `You are ${calculatedAge} years old by the end of 2021`
  }

  renderCalculatorAge = () => {
    const {showResult} = this.state

    if (showResult) {
      return <p className="results-msg">{this.getCalculatedAgeText()}</p>
    }
    return null
  }

  renderErrorMessage = () => {
    const {showError} = this.state

    if (showError) {
      return <p className="error-msg">Enter the year that you are Born</p>
    }
    return null
  }

  onEnteredAge = event => {
    const {value} = event.target

    this.setState({yearOfBirth: value})
    this.setIsResultVisible(false)
    this.setIsErrorOccurred(false)
  }

  renderInputField = () => {
    const {yearOfBirth} = this.state

    return (
      <input
        className="input-box"
        onChange={this.onEnteredAge}
        placeholder="Enter the year that you are born"
        type="text"
        value={yearOfBirth}
      />
    )
  }

  onClickCalculate = () => {
    const {yearOfBirth} = this.state
    const age = this.getCalculatedAge()

    if (age > 0 && yearOfBirth.length <= 4 && Number.isInteger(age)) {
      this.setIsErrorOccurred(false)
      this.setIsResultVisible(true)
    } else {
      this.setIsErrorOccurred(true)
    }
  }

  renderCalculateButton = () => (
    <div>
      <button className="button" onClick={this.onClickCalculate} type="button">
        Calculate
      </button>
    </div>
  )

  renderAgeCalculatorCard = () => (
    <div>
      <div className="card-container">
        <h1 className="heading">Age Calculator</h1>
        {this.renderInputField()}
        {this.renderErrorMessage()}
        {this.renderCalculatorAge()}
        {this.renderCalculateButton()}
      </div>
    </div>
  )

  render() {
    return (
      <div className="bg-container">
        {this.renderAgeCalculatorCard()}
        <img
          className="persons-img"
          alt="persons-img"
          src="https://assets.ccbp.in/frontend/react-js/age-calculater-persons-img.png"
        />
      </div>
    )
  }
}

export default AgeCalculator
