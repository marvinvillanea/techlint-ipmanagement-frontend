import techlintLogo from '../../../public/icon-long-techlint.svg';
import '../../App.css'
const SideBar = () => {
  return (
      <div className="aside">
        <div className="aside-header">
            <h3 className="aside-title"><img src={techlintLogo} className={'logo'} alt="TechLint" /></h3>
        </div>
        <div className="aside-body" data-simplebar data-simplebar-direction="ltr">
            {/*BEGIN Menu*/} 
            <div className="menu">
                <div className="menu-item">
                    <a href="index.html" data-menu-path="/index.html" className="menu-item-link">
                        <div className="menu-item-icon">
                            <i className="fa fa-desktop"></i>
                        </div>
                        <span className="menu-item-text">Dashboard</span>
                        <div className="menu-item-addon">
                            <span className="badge badge-success">New</span>
                        </div>
                    </a>
                </div>

                <div className="menu-item">
                    <a href="index.html" data-menu-path="/index.html" className="menu-item-link">
                        <div className="menu-item-icon">
                            <i className="fa fa-user-group"></i>
                        </div>
                        <span className="menu-item-text">User Management</span>
                        <div className="menu-item-addon">
                            <span className="badge badge-success">New</span>
                        </div>
                    </a>
                </div>

                {/*BEGIN Menu Section*/}
                <div className="menu-section">
                    <div className="menu-section-icon">
                        <i className="fa fa-ellipsis-h"></i>
                    </div>
                    <h2 className="menu-section-text">System Module</h2>
                </div>
                {/*END Menu Section*/}
                <div className="menu-item">
                    <button className="menu-item-link menu-item-toggle">
                        <div className="menu-item-icon">
                            <i className="fa fa-palette"></i>
                        </div>
                        <span className="menu-item-text">Base</span>
                        <div className="menu-item-addon">
                            <i className="menu-item-caret caret"></i>
                        </div>
                    </button>
                    {/*BEGIN Menu Submenu*/}
                    <div className="menu-submenu">
                        <div className="menu-item">
                            <a href="elements/base/accordion.html" data-menu-path="/elements/base/accordion.html" className="menu-item-link">
                                <i className="menu-item-bullet"></i>
                                <span className="menu-item-text">Accordion</span>
                            </a>
                        </div>
                        <div className="menu-item">
                            <a href="elements/base/alert.html" data-menu-path="/elements/base/alert.html" className="menu-item-link">
                                <i className="menu-item-bullet"></i>
                                <span className="menu-item-text">Alert</span>
                            </a>
                        </div>
                        <div className="menu-item">
                            <a href="elements/base/badge.html" data-menu-path="/elements/base/badge.html" className="menu-item-link">
                                <i className="menu-item-bullet"></i>
                                <span className="menu-item-text">Badge</span>
                            </a>
                        </div>
                        <div className="menu-item">
                            <a href="elements/base/breadcrumb.html" data-menu-path="/elements/base/breadcrumb.html" className="menu-item-link">
                                <i className="menu-item-bullet"></i>
                                <span className="menu-item-text">Breadcrumb</span>
                            </a>
                        </div>
                     
                    </div>
                    {/*END Menu Submenu*/}
                </div>
                
                
            </div>
            {/*END Menu*/}
        </div>
    </div>
  );
};

export default SideBar;
