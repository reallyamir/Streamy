import React from 'react'
import {connect} from 'react-redux'
import {fetchStream, editStream} from '../../actions'
import StreamForm from '../StreamForm'
import _ from 'lodash'

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues)  //why do we use this.props.match.params.id here instead of this.props.stream?
    }

    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <h3>Edit Stream</h3>
                <StreamForm onSubmit={this.onSubmit} initialValues={_.pick(this.props.stream, 'title', 'description')} />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id]}
    //its an object remember? you can access records directly with the brackets
}

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit)