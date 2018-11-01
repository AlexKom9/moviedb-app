import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";


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

export default Component =>  connect(
  mapStateToProps,
  mapDispatchToProps
)(class FilterPaginatorHOC extends React.Component {
  render() {
    return (<Component {...this.props}/>);
  }
})


