import React from 'react';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
  }
  handleInput = e => {
    e.persist();
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(e.target.value);
    }
  };
  render() {
    const { className } = this.props;
    return (
      <textarea
        className={className ? className : null}
        placeholder='Enter contnet here...'
        onInput={this.handleInput}
      />
    );
  }
}
