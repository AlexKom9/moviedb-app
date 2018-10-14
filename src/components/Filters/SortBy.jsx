import React from 'react';
import PropTypes from 'prop-types';

export default class SortBy extends React.PureComponent {
  static propTypes = {
    onChangeFilters: PropTypes.func.isRequired,
  };

  static defaultProps = {
    options: [
      {
        label: 'Популярные по убыванию',
        value: 'popularity.desc',
      },
      {
        label: 'Популярные по возростанию',
        value: 'popularity.asc',
      },
      {
        label: 'Рейтинг по возростанию',
        value: 'vote_average.asc',
      },
      {
        label: 'Рейтинг по убыванию',
        value: 'vote_average.desc',
      },
    ],
  };

  render() {
    const { onChangeFilters, sort_by, options } = this.props;
    // console.log('render SortBy');
    return (
      <div className="form-group">
        <label htmlFor="sort_by">Сортировать по:</label>
        <select
          className="form-control"
          id="sort_by"
          name="sort_by"
          value={sort_by}
          onChange={onChangeFilters}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    );
  }
}
