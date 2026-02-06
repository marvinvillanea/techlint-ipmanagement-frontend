const FooterContent = () => {
  return (
    <div className="footer">
        <div className="container-fluid g-4">
            <div className="row g-3">
                <div className="col-sm-6 text-center text-sm-start">
                    <p className="mb-0"><i className="far fa-copyright"></i> <span id="copyright-year"></span> Upmin. All rights reserved</p>
                </div>
                <div className="col-sm-6 text-center text-sm-end">
                    <p className="mb-0">Hand-crafted and made with <i className="fa fa-heart text-danger"></i></p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default FooterContent;
