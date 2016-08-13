import React, {Component} from 'react';
import {Menu, Popconfirm} from 'antd';
import {Link} from 'react-router';
import FAIcon from '../../components/faicon/FAIcon';
import UserAvatar from '../../components/UserAvatar';


class Header extends Component {
    static defaultProps = {
        menus: [],
    }

    handleClick = () => {

    }

    handleExit = () => {
        this.props.exit();
    }
    renderMenus = () => {
        return this.props.menus.map((menu, key) => {
            return (
                <Menu.Item key={`menu-${key}`}>
                    <Link to={menu.path}>
                        <FAIcon type={menu.icon}/><span>{menu.text}</span>
                    </Link>
                </Menu.Item>
            );
        });
    }

    render() {
        const collapsed = this.props.collapsed;
        const logoClass = collapsed ? 'collapsed' : '';
        const logo = collapsed ? 'super' : '人员管理系统';
        return (
            <div className="app-header">
                <div className={`logo ${logoClass}`}>
                    {logo}
                </div>
                <a className="app-sidebar-toggle" onClick={this.props.toggleSideBar}><FAIcon type="fa-bars"/></a>
                <div className="navigation">
                    <Menu
                        onClick={this.handleClick}
                        selectedKeys={['alipay']}
                        mode="horizontal"
                    >
                        {this.renderMenus()}
                    </Menu>
                </div>
                <ul className="menu">
                    <li>
                        <Link to="/system/profile/message">
                            <UserAvatar className="user-avatar" user={this.props.user}/>
                            <span>{this.props.user.name}</span>
                        </Link>
                    </li>
                    <li>
                        <Popconfirm placement="bottomRight" title="您确定要退出系统吗？" onConfirm={this.handleExit}>
                            <a>
                                <FAIcon type="fa-sign-out"/>
                                <span>退出系统</span>
                            </a>
                        </Popconfirm>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Header;
