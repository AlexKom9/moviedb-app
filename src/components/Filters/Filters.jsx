import React from "react";
import SortBy from './SortBy'
import Paginator from './Paginator'

export default class Filters extends React.Component {
  render() {
    const {filters: {sort_by, primary_release_year}, page, total_pages, onChangeFilters, onChangePage} = this.props;
    return (
      <form className="mb-3">
        <SortBy
          sort_by={sort_by}
          onChangeFilters={onChangeFilters}/>
        <div className="form-group">
          <label htmlFor="sort_by">Год релиза :</label>
          <select
            className="form-control"
            id="primary_release_year"
            name="primary_release_year"
            value={primary_release_year}
            onChange={onChangeFilters}>
            <option value="0">Выберите год</option>
            <option value="2018">2018</option>
            <option value="2005">2005</option>
            <option value="1996">1996</option>
          </select>
        </div>

        <Paginator
          page={page}
          total_pages={total_pages}
          onChangePage={onChangePage}
          />
      </form>
    );
  }
}
