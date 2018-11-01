import React from 'react';

export default class Paginator extends React.Component {
  render() {
    const { page, total_pages, onChangePage, mode } = this.props;
    return (
      <div className={`text-center ${mode === 'inline' ? 'd-flex justify-content-end' : ''}`}>
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            type="button"
            className="btn btn-light"
            disabled={page === 1}
            onClick={() => { onChangePage(page - 1); }}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            disabled={page === total_pages}
            onClick={() => { onChangePage(page + 1); }}
          >
            Вперед
          </button>
        </div>
        <p className={`mt-4 ${mode === 'inline' ? 'ml-4' : ''}`}>
          <strong>{page}</strong>
          {' '}
of
          {' '}
          <strong>{total_pages}</strong>
        </p>
      </div>
    );
  }
}
