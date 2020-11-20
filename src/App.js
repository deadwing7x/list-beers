import React, { Component } from "react";
import BeerTable from "./BeerTable";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      beers: [],
    };
  }

  componentDidMount() {
    let brandUrl =
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/beercraft5bac38c.json";
    fetch(brandUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            beers: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );

    let imageUrl =
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/beerimages7e0480d.json";
    fetch(imageUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: false,
            beerImages: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { beers, beerImages, error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <BeerTable beers={beers} beerImages={beerImages} />
      </div>
    );
  }
}

export default App;
