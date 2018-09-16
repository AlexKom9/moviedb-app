import React from "react";
import SortBy from "./SortBy";
import PrimaryRealise from "./PrimaryRealise";
import Paginator from "./Paginator";
import Ganres from "./Genres";

export default class Filters extends React.Component {
  render() {
    const {
      filters: { sort_by, primary_release_year },
      page,
      total_pages,
      onChangeFilters,
      onChangePage,
      onChangeGenre
    } = this.props;
    return (
      <form className="mb-3">
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />

        <PrimaryRealise
          primary_release_year={primary_release_year}
          onChangeFilters={onChangeFilters}
        />

        <Ganres onChangeGenre={onChangeGenre}/>

        <Paginator
          page={page}
          total_pages={total_pages}
          onChangePage={onChangePage}
        />
      </form>
    );
  }
}
