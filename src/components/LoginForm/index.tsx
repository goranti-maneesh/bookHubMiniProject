import {Component} from 'react'
import { History, LocationState } from "history"
import { RouteProps } from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'       
import  Cookies  from 'js-cookie'
import './index.css'

interface LoginStateObject{
    username: string,
    password: string,
    errorMsg: string,
    isErrorDisplayed: boolean,
    loadingStatus: boolean
}

interface LoginHistoryProps {
    history: any;
}

class LoginForm extends Component <LoginHistoryProps>{
    state:LoginStateObject ={
        username: "",
        password: "",
        errorMsg: "",
        isErrorDisplayed: false,
        loadingStatus: false
    }

    onFetchSuccess = (jwt_token: string) => {


        this.setState({
            isErrorDisplayed: false
        })
        const {history} = this.props
        Cookies.set("jwt_token", jwt_token, {expires: 30})
        history.replace("/")
    }

    onFetchFailure = (error_msg: string) => {
        this.setState({
            errorMsg: error_msg,
            isErrorDisplayed: true
        })
    }

    onChangeUsername = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            username: event.currentTarget.value
        })
    }

    onChangePassword = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            password: event.currentTarget.value
        })
    }

    onSubmitUserDetails = async (event: React.SyntheticEvent) => {
        event?.preventDefault()
        this.setState({
            isErrorDisplayed: false,
            loadingStatus: true
        })
        const {username, password} = this.state

        const url = "https://apis.ccbp.in/login"
        const userDetails = {
            username, password
        }

        const options = {
            method: "POST",
            body: JSON.stringify(userDetails)
        }

        const response = await fetch(url, options)
        const data = await response.json()
        this.setState({
            loadingStatus: false
        })
        if(response.ok){
            this.onFetchSuccess(data.jwt_token)
        }
        else{
            this.onFetchFailure(data.error_msg)
        }
    }

    renderLoader = () =>(
        <div className="products-loader-container">
            <Loader type={'TailSpin'} color="#0284C7" height={50} width={50}/>
        </div>
    )    

    render(): React.ReactNode{
        const {username, password, errorMsg, isErrorDisplayed, loadingStatus} = this.state
        const jwtToken = Cookies.get("jwt_token")
        if(jwtToken !== undefined){
            // return <Redirect to="/"/>
        }
        return(
            <div className="login-form-container">
                <div className="bookhub-image-section">
                    <img src="https://res.cloudinary.com/degjdup40/image/upload/v1650358763/Rectangle_1467_dondhr.png" alt="bookhub poster" className="bookhub-image"/>
                </div>
                <div className="input-feild-section">
                    <form className="credentials-container" onSubmit={this.onSubmitUserDetails}>
                        <img src="https://res.cloudinary.com/degjdup40/image/upload/v1650358820/Group_7731_fctd2h.png" alt="bookhub logo" className="bookhub-logo"/>
                        <ul className="ul-ele">
                            <li className="each-input-li">
                                <label className="label-ele">Username*</label>
                                <br/>
                                <input type="text" className="input-ele" value={username} onChange={this.onChangeUsername} />
                            </li>
                            <li className="each-input-li">
                                <label className="label-ele">Password*</label>
                                <br/>
                                <input type="password" className="input-ele" value={password} onChange={this.onChangePassword}/>
                                <br/>
                                {isErrorDisplayed ? <span className='error-msg'>{errorMsg}</span> : null}
                            </li>
                        </ul>
                        <button className="login-button">{loadingStatus ? this.renderLoader() : "Login"}</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default LoginForm