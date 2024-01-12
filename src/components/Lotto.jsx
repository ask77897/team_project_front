import React, {Component} from "react";

class Lotto extends Component {
    constructor(props) {
        super(props)
        this.state = {count:0, count2:0};
        this.handleClick = this.handleClick.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
    }

    handleClick() {
        this.setState({count: Math.floor(Math.random()*45+1)});
    }

    handleClick2() {
        this.setState({count2: Math.floor(Math.random()*45+1)});
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>
                    {this.state.count}
                </button>
                <button onClick={this.handleClick2}>
                    {this.state.count2}
                </button>
            </div>
        )
    }
}

export default Lotto;