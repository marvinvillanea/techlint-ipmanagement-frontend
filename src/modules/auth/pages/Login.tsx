import { useEffect  } from "react";
import LoginFormContainer from "./LoginFormContainer";
import techlintLogo from '../../../../public/icon-long-techlint.svg';


export default function Login() {


	useEffect(() => {
		document.title = import.meta.env.VITE_APP_NAME + ' - Login';
	}, []);

  return (
    <div className="holder">
      <div className="wrapper">
        <div className="content">
          <div className="container-fluid g-4">
            <div className="row g-0 align-items-center justify-content-center h-100">
              <div className="col-sm-8 col-md-6 col-lg-4 col-xl-3">

                <div className="portlet">
                  <div className="portlet-body">

                    {/* Avatar */}
                    <div className="text-center mt-4 mb-5">
                      	<a href="https://techlint.com/" target="_blank">
							<img src={techlintLogo} className="logo" alt="Vite logo" />
						</a>
                    </div>

					

					<LoginFormContainer />

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


