import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import '../styles/AuthForm.css';
import $ from 'jquery';

export default class AuthForm extends Component{
    componentDidMount(){
        const navHeight = $('.navbar').height();
        this.$form.css({
            right: '0',
            top: -this.$form.height() + +navHeight + 'px',
            opacity: 0
        });
        this.$form.animate({
            top: navHeight + 'px',
            opacity: 1
        }, 150)
    }
    render(){
        return (
            <div ref={el => this.$form = $(el)} style={{display: this.props.isExpanded ? 'block' : 'none'}} class="auth-form">
                <TextField 
                    hintText='Login...' 
                    value={this.props.loginValue} 
                    onChange={e => this.props.onLogin_change(e)}
                    style={{display: 'block'}}
                />
                <TextField 
                    hintText='Password...' 
                    value={this.props.passwordValue}
                    onChange={e => this.props.onPassword_change(e)}
                    type='password'
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