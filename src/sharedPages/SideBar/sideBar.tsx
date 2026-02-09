import React, { useState, useEffect } from "react";
import techlintLogo from '../../../public/icon-long-techlint.svg';
import '../../App.css';

const SideBar = () => {
    const host = window.location.origin; // origin = protocol + host
    const menuItems = [
        { name: "Dashboard", link: host + "/module/dashboard", icon: 'desktop' },
        { name: "IP Management", link: host + "/module/IPManagement", icon: 'database' },
        { name: "User Management", link: host + "/module/userManagement", icon: 'user-group' },
    ];

    const [active, setActive] = useState(window.location.pathname); // default active based on current path

    const handleClick = (link:any) => {
        setActive(new URL(link).pathname); // set active path
        window.location.href = link; // navigate to the link
    };

    return (
        <div className="aside">
            <div className="aside-header">
                <h3 className="aside-title">
                    <img src={techlintLogo} className={'logo'} alt="TechLint" />
                </h3>
            </div>
            <div className="aside-body" data-simplebar data-simplebar-direction="ltr">
                {/*BEGIN Menu*/}
                <div className="menu">
                    {menuItems.map((item, index) => (
                        <div className="menu-item" key={index}>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleClick(item.link);
                                }}
                                data-menu-path={item.name.toLowerCase()}
                                className={`menu-item-link ${active === new URL(item.link).pathname ? "active" : ""}`}
                            >
                                <div className="menu-item-icon">
                                    <i className={`fa fa-${item.icon}`}></i>
                                </div>
                                <span className="menu-item-text">{item.name}</span>
                                <div className="menu-item-addon">
                                    <span className="badge badge-success">New</span>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
                {/*END Menu*/}
            </div>
        </div>
    );
};

export default SideBar;
