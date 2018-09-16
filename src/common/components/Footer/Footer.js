import React from 'react';

const Footer = ({
  isAuthorized,
  onToShare,
  onLogout,
}) => (
    <footer className="text-center">
      <div className="footer-above">
        <div className="container">
          <div className="row">
            {/* <div className="footer-col col-md-12">
              <h3>Location</h3>
              <p>金門縣金寧鄉盤果西路6號</p>
            </div> */}
            {/* <div className="footer-col col-md-6">
              <h3>Around the Web</h3>
              <ul className="list-inline">
                <li className="list-inline-item">
                  <a className="btn-social btn-outline" target="_blank" href="https://www.facebook.com/kinmen.driving.school/">
                    <i className="fa fa-fw fa-facebook"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="btn-social btn-outline" href="#">
                    <i className="fa fa-fw fa-google-plus"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="btn-social btn-outline" href="#">
                    <i className="fa fa-fw fa-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="btn-social btn-outline" href="#">
                    <i className="fa fa-fw fa-linkedin"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="btn-social btn-outline" href="#">
                    <i className="fa fa-fw fa-dribbble"></i>
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
      <div className="footer-below">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              Copyright &copy; Your Website 2017
            </div>
          </div>
        </div>
      </div>
    </footer>
);

export default Footer;