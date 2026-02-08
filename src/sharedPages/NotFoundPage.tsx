const NotFoundPage = () => {
  return (
    <div className="holder">
		<div className="wrapper ">
			<div className="content">
				<div className="container-fluid g-4">
					<div className="row g-0 align-items-center justify-content-center h-100">
						<div className="col-md-8 col-lg-6 col-xl-4 text-center">
							<h1 className="widget20">404</h1>
							<h2 className="mb-3">Page Not Found!</h2>
							<p className="mb-4">Sorry we can't seem to find the page you're looking for. There may be amisspelling in the URL entered, or the page you are looking for may no longer exist.</p>
							<a href="/" className="btn btn-label-primary btn-lg btn-widest">Back to home</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
  );
};

export default NotFoundPage;
