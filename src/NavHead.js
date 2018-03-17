import React from "react"
import {Nav,NavItem} from 'react-bootstrap';
class NavHead extends React.Component{
    constructor(props){
        super(props);
        this.state={
            key:1
        }
    }
    handleSelect(eventKey) {
        this.setState(
            {
                key:eventKey
            }
        );
    }
    render(){
        return (
            <Nav bsStyle="pills" activeKey={this.state.key} onSelect={k => this.handleSelect(k)}>
                <NavItem eventKey={1}>
                    BTC
                </NavItem>
                <NavItem eventKey={2}>
                    RMB
                </NavItem>
                <NavItem eventKey={3}>
                    USD
                </NavItem>
            </Nav>
        );
    }
}
export default NavHead;