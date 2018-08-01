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
      stars.push(
        <svg
          style={{ fill: 'black', stroke: 'black', margin: 'auto 1px' }}
          width="13"
          height="13"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="175.706 104.107 18.71 17.456">
          <path
            className="a"
            d="M119.864,111.14l5.858-.769,2.641-4.97,2.8,4.97,5.148.769-4.142,3.846.947,5.764-4.755-3.219-5.422,3.219,1.3-5.764Z"
            transform="translate(57 -0.252)"
          />
        </svg>
      );
    }
    for (var i = 5 - stars.length; i > 0; i--) {
      stars.push(
        <svg
          style={{ fill: 'none', stroke: 'black', margin: 'auto 1px' }}
          width="13"
          height="13"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="175.706 104.107 18.71 17.456">
          <path
            className="a"
            d="M119.864,111.14l5.858-.769,2.641-4.97,2.8,4.97,5.148.769-4.142,3.846.947,5.764-4.755-3.219-5.422,3.219,1.3-5.764Z"
            transform="translate(57 -0.252)"
          />
        </svg>
      );
    }
    this.setState({ stars: stars });
  }

  render() {
    return (
      <div
        style={{
          display: 'inline',
          position: 'relative',
          fontSize: '0.7em',
          top: '-3px'
        }}>
        {this.state.stars}
      </div>
    );
  }
}

export default Star;
