import React from 'react'
import {connect} from 'react-redux'
import {createStream} from '../../actions'
import StreamForm from '../StreamForm'


class StreamCreate extends React.Component {
    onSubmit = (formValues) => {
        console.log(formValues)
        this.props.createStream(formValues)
    }

    render() {
        return (
            <div>
                <h3>Create a stream</h3>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        )
    }
}

export default connect(null, {createStream})(StreamCreate)

//s hk after double cr mp
//s hk after cr lk cr lp 