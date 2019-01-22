import React from 'react';

export default class Editor extends React.Component {
  state = { value: '' };
  handleChange = e => {
    e.persist();
    let value = e.target.value;
    if (typeof this.props.change === 'function') {
      this.props.change(value);
    }
    this.setState({ value });
  };
  componentWillReceiveProps(newProps) {
    let { content } = newProps;
    console.log('componentWillReceiveProps', content === this.props.content);
    if (content !== this.props.content) {
      this.setState({ value: content });
    }
  }
  render() {
    let { content } = this.props;
    let { value } = this.state;
    return (
      <textarea
        className='post-editor'
        placeholder='Enter contnet here...'
        onChange={this.handleChange}
        value={value}
      />
    );
  }
}
