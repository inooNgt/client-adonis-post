import React from 'react';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
  }
  state = { value: '' };
  handleInput = e => {
    e.persist();
    let value = e.target.value;
    this.setState({
      value
    });
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(value);
    }
  };
  componentWillReceiveProps(props) {
    this.setState({ value: props.content });
  }
  render() {
    const { className } = this.props;
    return (
      <textarea
        className={className ? className : null}
        placeholder='Enter contnet here...'
        onChange={this.handleInput}
        value={this.state.value}
      />
    );
  }
}
