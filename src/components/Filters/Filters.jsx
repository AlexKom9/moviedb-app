import React, { Component } from 'react';
import SortBy from './SortBy';
import PrimaryRealise from './PrimaryRealise';
import Paginator from './Paginator';
import Ganres from './Genres';

export default class Filters extends Component {
  render() {
    const {
      filters,
      filters: { sort_by, primary_release_year },
      page,
      total_pages,
      onChangeFilters,
      onChangePage,
    } = this.props;
    return (
      <form className="mb-3">
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />

        <PrimaryRealise
          primary_release_year={primary_release_year}
          onChangeFilters={onChangeFilters}
        />

        <Ganres filters={filters} onChangeFilters={onChangeFilters} />

        <Paginator
          page={page}
          total_pages={total_pages}
          onChangePage={onChangePage}
        />
      </form>
    );
  }
}
