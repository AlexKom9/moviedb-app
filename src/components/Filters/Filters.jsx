import React, { Component } from "react";
import SortBy from "./SortBy";
import PrimaryRealise from "./PrimaryRealise";
import FilterPaginatorHOC from '../HOC/FilterPaginatorHOC'
import Paginator from "./Paginator";
import Genres from "./Genres/Genres";


const FilterPaginator = FilterPaginatorHOC(Paginator);

export default class Filters extends Component {
  render() {
    return (
      <form className="mb-3">
        <SortBy />
        <PrimaryRealise />
        <Genres />
        <FilterPaginator/>
      </form>
    );
  }
}
