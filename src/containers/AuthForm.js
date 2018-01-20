import React, {Component} from 'react';
import AuthFormComponent from '../components/AuthForm';
import store from '../store';
import Constants from '../Constants';
import {connect} from 'react-redux';

class AuthForm extends Component{
    constructor(){
        super();
        this.state = {
            loginValue: '',
            passwordValue: '',
            isExpanded: false
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
        store.dispatch({
            type: Constants.SIGN_IN,
            login: this.state.loginValue,
            password: this.state.passwordValue
        })
    }
    render(){
        return (
            this.props.user 
            ?
            null
            :
            <AuthFormComponent
                loginValue={this.state.loginValue}
                passwordValue={this.state.passwordValue}
                isExpanded={this.state.isExpanded}
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