import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";

class Paginator extends React.Component {
  render() {
    const { page, total_pages, onChangePage } = this.props;
    return (
      <div className="text-center">
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
            onClick={() => { onChangePage(page + 1); }}
          >
            Вперед
          </button>
        </div>
        <p className="mt-4">
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

const mapStateToProps = ({ movies }) => {
  return {
    page: movies.page,
    total_pages: movies.total_pages,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      onChangePage: actions.actionCreatorChangePage,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Paginator);

