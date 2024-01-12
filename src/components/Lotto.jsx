import Button from 'react-bootstrap/Button';
import React, {Component} from "react";

class Lotto extends Component {
    constructor(props) {
        super(props)
        this.state = {count1:0, count2:0, count3:0, count4:0, count5:0, count6:0};
        this.handleClick1 = this.handleClick1.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
        this.handleClick3 = this.handleClick3.bind(this);
        this.handleClick4 = this.handleClick4.bind(this);
        this.handleClick5 = this.handleClick5.bind(this);
        this.handleClick6 = this.handleClick6.bind(this);
    }

    handleClick1() {
        this.setState({count1: Math.floor(Math.random()*45+1)});
    }

    handleClick2() {
        this.setState({count2: Math.floor(Math.random()*45+1)});
    }

    handleClick3() {
        this.setState({count3: Math.floor(Math.random()*45+1)});
    }

    handleClick4() {
        this.setState({count4: Math.floor(Math.random()*45+1)});
    }

    handleClick5() {
        this.setState({count5: Math.floor(Math.random()*45+1)});
    }

    handleClick6() {
        this.setState({count6: Math.floor(Math.random()*45+1)});
    }


    render() {
        return (
            <div>
                <Button variant="primary" onClick={this.handleClick1}>
                    {this.state.count1}
                </Button>
                <Button variant='secondary' onClick={this.handleClick2}>
                    {this.state.count2}
                </Button>
                <Button variant="success" onClick={this.handleClick3}>
                    {this.state.count3}
                </Button>
                <Button variant="warning" onClick={this.handleClick4}>
                    {this.state.count4}
                </Button>
                <Button variant="danger" onClick={this.handleClick5}>
                    {this.state.count5}
                </Button>
                <Button variant='info' onClick={this.handleClick6}>
                    {this.state.count6}
                </Button>
            </div>
        )
    }
}

export default Lotto;
