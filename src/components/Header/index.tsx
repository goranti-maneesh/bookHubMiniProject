import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {BiMenu} from 'react-icons/bi'
import {IoIosCloseCircle} from 'react-icons/io'
import Cookies from 'js-cookie'

import './index.css'

interface HerderStateInterface{
    history: any
}

interface StateType  {
    onClickMenu: boolean
}

class Header extends Component <HerderStateInterface>{
    state: StateType ={
        onClickMenu: false
    }

    onClickLogout = () => {
        const {history} = this.props
        Cookies.remove("jwt_token")
        history.replace("/login")
    }

    homeShelfLogoutSection = () => (
        <ul className='header-links'>
            <Link to="/" className='link'>
                <li className='list-ele '>
                    Home                                
                </li>
            </Link>
            <Link to="/shelf" className='link'>
                <li className='list-ele'>
                    Bookshelves                                
                </li>
            </Link>
            <li className='list-ele'>
                <button className='logout-btn' onClick={this.onClickLogout}>Logout</button>
            </li>
        </ul>
    )

    renderHomeShelfLogoutSection = () => (
        <div className='large-device-header-links'>
            {this.homeShelfLogoutSection()}
        </div>
    )

    renderOnclickMenuSection = () => {
        const {onClickMenu} = this.state
        return(
            <div>
                {
                    onClickMenu ? 
                    <div className='small-device-menu-section'>
                        {this.homeShelfLogoutSection()}
                        <button onClick={this.onClickCloseMenuStatus} className="cross-mark-button">
                            <IoIosCloseCircle className='cross-mark-icon'/>
                        </button>
                    </div>
                    : null
                }
            </div>
        )
    }

    onClickOpenMenuStatus = () => {
        this.setState(({
            onClickMenu: true
        }))
    }

    onClickCloseMenuStatus = () => {
        this.setState(({
            onClickMenu: false
        }))
    }

    render(){
        return(
            <div className='header-main-container'>
                <div className="header-container">
                    <Link to='/'>
                        <img src="https://res.cloudinary.com/degjdup40/image/upload/v1650358820/Group_7731_fctd2h.png" className='header-bookhub-logo' alt='header bookhub logo'/>
                    </Link>
                    {this.renderHomeShelfLogoutSection()}
                    <button onClick={this.onClickOpenMenuStatus} className="menu-button">
                        <BiMenu className='menu-icon'/>
                    </button>
                </div>
                <div className='small-device-menu'>
                    {this.renderOnclickMenuSection()}
                </div>
            </div>
        )
    }
}

export default Header