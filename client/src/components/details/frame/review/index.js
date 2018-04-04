import React from 'react';
import Star from './star.js'

class Review extends React.Component {
  constructor(props) {
    super(props);
    let lengthCheck = props.review.text.length > 150;
    this.state = {
      text: lengthCheck
        ? props.review.text.slice(0, 150) + '...'
        : props.review.text,
      butStyle: { display: lengthCheck ? 'inline' : 'none' }
    };
  }

  handleClick = () => {
    this.setState({
      text: this.props.review.text,
      butStyle: { display: 'none' }
    });
  };

  render() {
    return (
      <blockquote className="card p-3 blockquote">
        <div className="headline">
          <span className="text-muted">{this.props.review.author_name}</span>
          <span className="mx-3 rating"><Star rating={this.props.review.rating}/></span>
          <small style={{position:"relative", top:"-2px"}} className="text-muted">{this.props.review.relative_time_description}</small>
        </div>
        <small className="">
          {this.state.text}
          <span
            style={this.state.butStyle}
            className="btn-link mx-2"
            onClick={() => this.handleClick()}>
            More
          </span>
        </small>
      </blockquote>
    );
  }
}

export default Review;
