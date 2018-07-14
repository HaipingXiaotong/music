import React, { Component } from 'react'
import './index.less'
class Check extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked
        }
    }
    componentWillUpdate(prevProps, prevState) {
        if (prevProps.checked !== this.props.checked) {
            this.setState({ checked: this.props.checked })
        }
    }
    checkClick = (e) => {
        if (this.props.change) {
            this.props.change()
        }
        this.setState({ checked: !this.state.checked })
    }
    render() {
        return (
            <div className="my-check">
                <input onChange={this.checkClick}
                    checked={this.state.checked}
                    type="checkbox"
                    name={this.props.name} />
                {this.state.checked &&
                    <div className="icon-posi"><svg t="1528290990894" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2548" width="13" height="13"><defs><style type="text/css"></style></defs><path d="M431.47 793.782c-11.365 0-22.332-4.378-30.589-12.286l-235.495-225.535c-17.64-16.894-18.245-44.891-1.35-62.528 16.894-17.64 44.891-18.245 62.532-1.351l201.055 192.552 364.692-443.171c15.519-18.86 43.39-21.567 62.253-6.049 18.861 15.519 21.568 43.39 6.048 62.251l-394.992 479.993c-7.821 9.504-19.248 15.319-31.534 16.047-0.874 0.052-1.748 0.078-2.621 0.078z" p-id="2549" fill="#dddddd"></path></svg>
                    </div>
                }
            </div>
        )
    }
}
Check.defaultProps = {
    checked: false
}
export default Check