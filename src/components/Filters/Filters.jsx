import React, { Component } from "react";
import SortBy from "./SortBy";
import PrimaryRealise from "./PrimaryRealise";
import Paginator from "./Paginator";
import Genres from "./Genres/Genres";

export default class Filters extends Component {
  render() {
    return (
      <form className="mb-3">
        <SortBy />
        <PrimaryRealise />
        <Genres />
        <Paginator />
      </form>
    );
  }
}
