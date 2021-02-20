import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = {
    error: false,
    message: ""
  };

  componentDidCatch = (err, msg) => {
    this.setState({
      error: true,
      message: msg
    });
  };

  render() {
    if (this.state.error) return <h2>{this.state.message}</h2>;
    else return this.props.children;
  }
}
