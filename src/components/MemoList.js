import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { Memo } from '../components';

export default class MemoList extends Component {

  render() {
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="memo"
          transitionEnterTimeout={2000}
          transitionLeaveTimeout={1000}>
          {this.props.data.map((memo, i) => {
            return (
              <Memo
                data={memo}
                ownership={memo.writer === this.props.currentUser}
                key={memo.id}
                index={i}
                currentUser={this.props.currentUser}
              />);
          })}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

MemoList.propTypes = {
  data: PropTypes.array.isRequired,
  currentUser: PropTypes.string.isRequired,
};

