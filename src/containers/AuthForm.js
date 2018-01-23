import React, {Component} from 'react';
import AuthFormComponent from '../components/AuthForm';
import store from '../store';
import Constants from '../Constants';
import {connect} from 'react-redux';
import interactions from '../interactions';

class AuthForm extends Component{
    constructor(){
        super();
        this.state = {
            loginValue: '',
            passwordValue: '',
        }
    }
    onLogin_change(e){
        this.setState({
            loginValue: e.target.value
        })
    }
    onPassword_change(e){
        this.setState({
            passwordValue: e.target.value
        })
    }
    onSignIn(){
        interactions.signIn(this.state.loginValue, this.state.passwordValue);
    }
    onSignUp(){
        interactions.signUp(this.state.loginValue, this.state.passwordValue);
    }
    render(){
        return (
            <AuthFormComponent
                loginValue={this.state.loginValue}
                passwordValue={this.state.passwordValue}
                isExpanded={this.props.isExpanded}
                onLogin_change={e => this.onLogin_change(e)}
                onPassword_change={e => this.onPassword_change(e)}
                onSignIn={() => this.onSignIn()}
                onSignUp={() => this.onSignUp()}
            />
        )
    }
}
function stateToProps(state){
    return {
        user: state.user
    }
}
export default connect(stateToProps)(AuthForm);