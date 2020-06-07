import { Component } from "react";
import axios from "axios";

class HandyAuth extends Component {
  async addToken() {
    /** used in case to use token or some information in each request */
    axios.defaults.params = {};
  }

  render() {
    this.addToken();
    return this.props.children;
  }
}

export default HandyAuth;
