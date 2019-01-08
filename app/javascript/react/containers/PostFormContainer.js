import React from 'react'
import { Router, Route, Switch, browserHistory } from 'react-router'

class PostFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateBody = this.validateBody.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
}

  validateBody(selection) {
    if (selection.trim() === '') {
      let newError = { body: 'The post can not be blank.' }
      this.setState({ errors: Object.assign({}, this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.body
      this.setState({ errors: errorState })
      return true
    }
  }

  handleChange(event) {
    let value = event.target.value
    let name = event.target.name
    this.setState({ [name]: value })
  }

  handleClearForm(){
    this.setState({
      body: '',
      errors: ''
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.validateBody(this.state.body)) {
      let body = new FormData()
      body.append("body", this.state.body)

      fetch(`/api/v1/posts`, {
        credentials: 'same-origin',
        method: 'POST',
        body: body,
        headers: {
          'Accept': 'application/json' },
          credentials: 'same-origin'
      })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.handleClearForm()
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  render() {
    let errorDiv;
    let errorItems;
    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<p key={error}>{error}</p>)
      })
      errorDiv = <div className="callout alert">{errorItems}</div>
    }
    return(
      <form className="callout" onSubmit={this.handleSubmit}>
        <input name='body' type='text' value={this.state.body} onChange={this.handleChange} />
        <input className="button" type="submit" value="Submit" />
        {errorDiv}  
      </form>
    );
  }
};

export default PostFormContainer;
