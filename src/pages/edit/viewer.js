import React from 'react';

import 'scss/heighlight.scss';

export default class Viewer extends React.Component {
  genarateInnerHtml() {
    return { __html: this.props.content };
  }
  render() {
    return (
      <section
        className='post-viewer rich-text'
        dangerouslySetInnerHTML={this.genarateInnerHtml()}
      />
    );
  }
}
