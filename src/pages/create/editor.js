import React from 'react';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput(e) {
    e.persist();
    if (typeof this.props.change === 'function') {
      this.props.change(e.target.value);
    }
  }
  render() {
    return (
      <textarea
        className='post-editor'
        placeholder='请输入内容...'
        onInput={this.handleInput}
      />
    );
  }
}
