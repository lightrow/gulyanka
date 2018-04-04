import React from 'react';

class Star extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: []
    };
  }

  componentWillMount() {
    let stars = [];
    for (var i = this.props.rating; i > 0; i--) {
      stars.push(<i class="fas fa-star fa-xs" />);
    }
    for (var i = 5 - stars.length; i > 0; i--) {
      stars.push(<i class="far fa-star fa-xs" />);
    }
    this.setState({ stars: stars });
  }

  render() {
    return (
      <div
        style={{
          display: 'inline',
          position: "relative",
          fontSize: "0.7em",
          top:"-3px"
        }}>
        {this.state.stars}
      </div>
    );
  }
}

export default Star;
