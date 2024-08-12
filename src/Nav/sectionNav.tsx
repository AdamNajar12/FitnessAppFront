import { Component, ReactNode } from "react";

class SectionNavbar extends Component{
render(){
    return(
<section className=" slider_section position-relative">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 offset-md-2">
            <div className="slider_heading">
              <h2>
                Bo <span>xer</span>
              </h2>
            </div>
          </div>
          <div className="col-md-8 mx-auto">
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active">01</li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1">02</li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2">03</li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="box">
                    <div className="detail-box">
                      <h1>
                        Boxing <br />
                        Center
                      </h1>
                      <hr />
                      <div className="btn-box">
                        <a href="" className="btn-1">
                          Contact Us
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="box">
                    <div className="detail-box">
                      <h1>
                        Boxing <br />
                        Center
                      </h1>
                      <hr />
                      <div className="btn-box">
                        <a href="" className="btn-1">
                          Contact Us
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="box">
                    <div className="detail-box">
                      <h1>
                        Boxing <br />
                        Center
                      </h1>
                      <hr />
                      <div className="btn-box">
                        <a href="" className="btn-1">
                          Contact Us
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>



    )
}










}
export default SectionNavbar