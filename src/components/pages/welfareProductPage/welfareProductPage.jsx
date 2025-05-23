import React, { Component } from "react";
import { TITLE } from "../../../const";
import Loader from "../../loader";

import "./welfareProductPage.css";

class welfareProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: {},
    };
  }

  componentDidMount() {
    fetch("https://csess.su.hkust.edu.hk/api/welfareProducts.php")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let prod = Object.groupBy(data, ({ session }) => session);
        this.setState({ products: prod });
      });
  }

  renderProductsBySession(session) {
    const products = this.state.products;
    return products[session].map((product) => {
      return (
        <div className="welfare-product" key={product.id}>
          <div className="product-image">
            <img src={product.image} alt={product.name} loading="lazy" />
          </div>
          <div className="description">
            <div className="product-name">
              <span>{product.name}</span>
            </div>
          </div>
        </div>
      );
    });
  }

  renderProductGroup() {
    const products = this.state.products;
    if (products && Object.keys(products).length > 0) {
      return Object.keys(products).map((session) => {
        return (
          <div key={session}>
            <h2>Session {session}</h2>
            <div className="welfare-products">
              {this.renderProductsBySession(session)}
            </div>
          </div>
        );
      });
    } else {
      return <Loader />;
    }
  }

  render() {
    return (
      <div>
        <title>{`Welfare Products | ${TITLE}`}</title>
        <div className="welfareProducts">
          <div className="container">
            <h1 className="pageHeader">Welfare Products</h1>
            <div className="products">{this.renderProductGroup()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default welfareProductPage;
