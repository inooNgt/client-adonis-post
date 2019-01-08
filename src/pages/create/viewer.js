import React from 'react';

import './heighlight.scss';

export default class Viewer extends React.Component {
  genarateInnerHtml() {
    return { __html: this.props.content };
  }
  render() {
    return (
      <section
        className='post-viewer'
        dangerouslySetInnerHTML={this.genarateInnerHtml()}
      />
    );
  }
}
