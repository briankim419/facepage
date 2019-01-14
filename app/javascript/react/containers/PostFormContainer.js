import React from 'react'
import { Router, Route, Switch, browserHistory } from 'react-router';
import Dropzone from 'react-dropzone';


class PostFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      errors: {},
      file: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateBody = this.validateBody.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.onDrop = this.onDrop.bind(this);
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
      this.props.addNewPost({body: this.state.body, post_photo: this.state.file[0] })

      let body = new FormData()
      body.append("body", this.state.body)
      body.append("post_photo", this.state.file[0])

      fetch(`/api/v1/posts`, {
        credentials: 'same-origin',
        method: 'POST',
        body: body,
        headers: {
          'Accept': 'application/json' }
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
  onDrop(file) {
    if(file.length == 1) {
      this.setState({ file: file })
    } else {
      this.setState({ message: 'You can only upload one photo per post.'})
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
          <section>
            <div className="dropzone">
              <Dropzone onDrop={this.onDrop}>
                <p>Try dropping some files here, or click to select files to upload.</p>
              </Dropzone>
            </div>
            <aside>
              <h2>Dropped files</h2>
              <ul>
                {
                  this.state.file.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                }
              </ul>
            </aside>
          </section>

        <input className="button" type="submit" value="Submit" />
      </form>
    );
  }
};

export default PostFormContainer;
