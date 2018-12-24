import React from 'react';

import './index.scss';

export default class Page extends React.Component {
  render() {
    return <section className='page'>{this.props.children}</section>;
  }
}
