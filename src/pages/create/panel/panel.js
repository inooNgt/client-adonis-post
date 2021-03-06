import React from 'react';
import Button from '@material-ui/core/Button';
import './panel.scss';

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
  }
  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };
  handleSubmit = () => {
    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit({ title: this.state.title });
    }
  };
  componentWillReceiveProps(newProps) {
    let { title } = newProps;
    if (title) {
      this.setState({ title });
    }
  }
  render() {
    return (
      <div className='post-panel'>
        <input
          type='text'
          className='post-title'
          value={this.state.title}
          onChange={this.handleTitleChange}
          placeholder='Enter title here...'
          maxLength='80'
        />
        <Button
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          onClick={this.handleSubmit}
        >
          Publish
        </Button>
      </div>
    );
  }
}
