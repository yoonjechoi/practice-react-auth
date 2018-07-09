import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { memoPostRequest, memoListRequest } from '../actions/memo';
import { Write, MemoList } from '../components';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingState: false,
            initiallyLoaded: false,
        };
    }

    render() {
        const emptyView = (
            <div className="container">
                <div className="empty-page">
                    <b>{this.props.username}</b> isn't registered or hasn't written any memo
            </div>
            </div>
        );

        const wallHeader = (
            <div>
                <div className="container wall-info">
                    <div className="card wall-info blue lighten-2 white-text">
                        <div className="card-content">
                            {this.props.username}
                        </div>
                    </div>
                </div>
                {this.state.initallyLoaded && this.props.memoData.length === 0 ? emptyView : undefined}
            </div>
        );

        return (
            <div className="wrapper">
                {typeof this.props.username !== 'undefined' ? wallHeader : undefined}
                {this.props.isLoggedIn ? <Write onPost={this.handlePost} /> : undefined}
                <MemoList
                    data={this.props.memoData}
                    currentUser={this.props.currentUser}
                    onEdit={this.handleEdit}
                    onRemove={this.handleRemove}
                    onStar={this.handleStar} />
            </div>
        )
    }
}

Home.propTypes = {
    username: PropTypes.string
}


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        postStatus: state.memo.post,
        currentUser: state.authentication.status.currentUser,
        memoData: state.memo.list.data,
        listStatue: state.memo.list.status,
        isLast: state.memo.list.isLast,
        editStatus: state.memo.edit,
        removeStatus: state.memo.remove,
        starStatue: state.memo.star,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        memoPostRequest: (contents) => {
            return dispatch(memoPostRequest(contents));
        },

        memoListRequest: (isInitial, listType, id, username) => {
            return dispatch(memoListRequest(isInitial, listType, id, username));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);