const HeaderContent = (
	{
		eventHolder = (): void => {},
		name = "",
		email = "",
		role = "",
	}
) => {
  return (
    <>
    <div className="header">
    	
		{/*BEGIN Desktop Sticky Header*/}
		<div className="sticky-header" id="sticky-header-desktop">
			{/*BEGIN Header Holder*/}
			<div className="header-holder header-holder-desktop">
				<div className="header-container container-fluid g-4">
					<div className="header-wrap header-wrap-block justify-content-start">
					{/* inline */}
					</div>
					<div className="header-wrap hstack gap-2">

						<div className="dropdown">
							<button className="btn btn-flat-primary widget13" data-bs-toggle="dropdown">
								<div className="widget13-text"> Hi <strong>{name}</strong>
								</div>
								{/*BEGIN Avatar*/}
								<div className="avatar avatar-info widget13-avatar">
									<div className="avatar-display">
										<i className="fa fa-user-alt"></i>
									</div>
								</div>
								{/*END Avatar*/}
							</button>
							<div className="dropdown-menu dropdown-menu-wide dropdown-menu-end dropdown-menu-animated overflow-hidden py-0">
								{/*BEGIN Portlet*/}
								<div className="portlet border-0">
									<div className="portlet-header bg-primary rounded-0">
										{/*BEGIN Rich List Item*/}
										<div className="rich-list-item w-100 p-0">
											<div className="rich-list-prepend">
												{/*BEGIN Avatar*/}
												<div className="avatar avatar-label-light avatar-circle">
													<div className="avatar-display">
														<i className="fa fa-user-alt"></i>
													</div>
												</div>
												{/*END Avatar*/}
											</div>
											<div className="rich-list-content">
												<h3 className="rich-list-title text-white thumbnail-fullname">{role}</h3>
												<span className="rich-list-subtitle text-white thumbnail-email">{email}</span>
											</div>
										
										</div>
										{/*END Rich List Item*/}
									</div>
									<div className="portlet-body p-0">
										{/*BEGIN Grid Nav*/}
										<div className="grid-nav grid-nav-flush grid-nav-action grid-nav-no-rounded">
											<div className="grid-nav-row">
												<a href="#" className="grid-nav-item">
													<div className="grid-nav-icon">
														<i className="far fa-address-card"></i>
													</div>
													<span className="grid-nav-content">Profile</span>
												</a>
											</div>
											
										</div>
										{/*END Grid Nav*/}
									</div>
										<button className="btn btn-label-danger logout-trigger" onClick={eventHolder}>Sign out</button>
								</div>
								
							</div>
						</div>
						{/*END Dropdown*/}
					</div>
				</div>
			</div>
			{/*END Header Holder*/}
		</div>
		{/*END Desktop Sticky Header*/}
		
		
		{/*BEGIN Header Holder*/}
		<div className="header-holder header-holder-desktop">
			<div className="header-container container-fluid g-4">
				<h4 className="header-title">Dashboard</h4>
				<i className="header-divider"></i>
				<div className="header-wrap header-wrap-block justify-content-start">
					{/*BEGIN Breadcrumb*/}
					<div className="breadcrumb breadcrumb-transparent mb-0">
						<a href="index.html" className="breadcrumb-item">
							<div className="breadcrumb-icon">
								<i data-feather="home"></i>
							</div>
							<span className="breadcrumb-text">Dashboard</span>
						</a>
					</div>
					{/*END Breadcrumb*/}
				</div>
				
			</div>
		</div>
	</div>
    </>
  );
};

export default HeaderContent;
