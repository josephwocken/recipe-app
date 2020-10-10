import React from 'react';

class CreateRecipeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please create a recipe'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A recipe was created: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Recipe:
          <br></br>
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <br></br>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default CreateRecipeComponent;
