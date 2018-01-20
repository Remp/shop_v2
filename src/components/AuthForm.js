import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import '../styles/AuthForm.css';

export default class AuthForm extends Component{
    render(){
        return (
            <div style={{display: this.props.isExpanded ? 'block' : 'none'}} class="auth-form">
                <TextField 
                    hintText='Login...' 
                    value={this.props.loginValue} 
                    onChange={e => this.props.onLogin_change(e)}
                />
                <TextField 
                    hintText='Password...' 
                    value={this.props.passwordValue}
                    onChange={e => this.props.onPassword_change(e)}
                />
                <div class="lower">
                    <FlatButton 
                        onClick={() => this.props.onSignIn()} 
                        backgroundColor='#a4c639' 
                        hoverColor='#8AA62F' 
                        label='Sign in' 
                    />
                    <div class="divider">or</div>
                    <FlatButton onClick={() => this.props.onSignUp()} label='Sign up' />
                </div>
            </div>
        )
    }
}