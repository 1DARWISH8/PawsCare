import React from 'react'
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import { BiCalendar } from 'react-icons/bi';

// function AddExternalStyles() {
//     useEffect(() => {
//       const addLink = (href) => {
//         const link = document.createElement('link');
//         link.rel = 'stylesheet';
//         link.type = 'text/css';
//         link.href = href;
//         document.head.appendChild(link);
//       };
  
//       // Add Bootstrap CSS
//       addLink('https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css');
//       addLink('https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/css/bootstrap-extended.min.css');
//       addLink('https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/fonts/simple-line-icons/style.min.css');
//       addLink('https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/css/colors.min.css');
//       addLink('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
      
//       // Clean up function
//       return () => {
//         // Remove added links if necessary
//       };
//     }, []);
  
//     return null; // Since this component only handles side effects, return null
//   }


function Dashboard() {
  return (
    
    <div className='container-fluid'>
    <section id="minimal-statistics">
    <div className="row">
        <div className="col-xl-3 col-sm-6 col-12 p-3"> 
        <div className="card">
            <div className="card-body">
                <div className="row align-items-center">
                <div className="col-auto">
                <i className="bi bi-person fs-1 "></i>
                </div>
                <div className='col'>
                    <div className="text-end">
                    <h3>278</h3>
                    <span>USERS</span>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    <div className="col-xl-3 col-sm-6 col-12 p-3">
        <div className="card">
            <div className="card-body">
                <div className="row align-items-center">
                    <div className="col">
                        <div className="text-start">
                            <h3>156</h3>
                            <span>BOOKED APPOINTMENTS</span>
                        </div>
                    </div>
                    <div className="col-auto">
                        <BiCalendar className="fs-1" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="col-xl-3 col-sm-6 col-12 p-3"> 
        <div className="card">
            <div className="card-body">
                <div className="row align-items-center">
                    <div className="col-auto">
                        <i className="bi bi-box fs-1"></i>                    </div>
                    <div className='col'>
                        <div className="text-end">
                            <h3>278</h3>
                            <span>PRODUCTS</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="col-xl-3 col-sm-6 col-12 p-3">
        <div className="card">
            <div className="card-body">
                <div className="row align-items-center">
                    <div className="col">
                        <div className="text-start">
                            <h3>156</h3>
                            <span>ORDERS PLACED</span>
                        </div>
                    </div>
                    <div className="col-auto">
                        <i className="bi bi-cart fs-1"></i>                    
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<div className="row">
    <div className="col-xl-3 col-sm-6 col-12 p-3">
        <div className="card">
            <div className="card-body">
                <div className="row align-items-center">
                    <div className="col">
                        <div className="text-start">
                            <h3>156</h3>
                            <span>LOCATIONS</span>
                        </div>
                    </div>
                    <div className="col-auto">
                        <i className="bi bi-geo fs-1"></i>                    </div>
                </div>
            </div>
        </div>
    </div>
      <div className="col-xl-3 col-sm-6 col-12 p-3">
        <div className="card">
          <div className="card-content">
            <div className="card-body">
              <div className="media d-flex">
                <div className="media-body text-left">
                  <h3 className="success">156</h3>
                  <span>New Clients</span>
                </div>
                <div className="align-self-center">
                  <i className="icon-user success font-large-2 float-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div className="col-xl-3 col-sm-6 col-12 p-3">
        <div className="card">
          <div className="card-content">
            <div className="card-body">
              <div className="media d-flex">
                <div className="media-body text-left">
                  <h3 className="warning">64.89 %</h3>
                  <span>Conversion Rate</span>
                </div>
                <div className="align-self-center">
                  <i className="icon-pie-chart warning font-large-2 float-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 col-12 p-3">
        <div className="card">
          <div className="card-content">
            <div className="card-body">
              <div className="media d-flex">
                <div className="media-body text-left">
                  <h3 className="primary">423</h3>
                  <span>Support Tickets</span>
                </div>
                <div className="align-self-center">
                  <i className="icon-support primary font-large-2 float-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div className="row">
      <div className="col-xl-3 col-sm-6 col-12 p-3">
        <div className="card">
          <div className="card-content">
            <div className="card-body">
              <div className="media d-flex">
                <div className="media-body text-left">
                  <h3 className="primary">278</h3>
                  <span>New Posts</span>
                </div>
                <div className="align-self-center">
                  <i className="icon-book-open primary font-large-2 float-right"></i>
                </div>
              </div>
              <div className="progress mt-1 mb-0">
                 {/* style="height: 7px;"> */}
                <div className="progress-bar bg-primary" role="progressbar" 
                // style={{width= 80%}}
                aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 col-12 p-3">
        <div className="card">
          <div className="card-content">
            <div className="card-body">
              <div className="media d-flex">
                <div className="media-body text-left">
                  <h3 className="warning">156</h3>
                  <span>New Comments</span>
                </div>
                <div className="align-self-center">
                  <i className="icon-bubbles warning font-large-2 float-right"></i>
                </div>
              </div>
              <div className="progress mt-1 mb-0" >
            {/* //   style="height: 7px; */}
                <div className="progress-bar bg-warning" role="progressbar"
                // style="width: 35%"
                aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div className="col-xl-3 col-sm-6 col-12 p-3">
        <div className="card">
          <div className="card-content">
            <div className="card-body">
              <div className="media d-flex">
                <div className="media-body text-left">
                  <h3 className="success">64.89 %</h3>
                  <span>Bounce Rate</span>
                </div>
                <div className="align-self-center">
                  <i className="icon-cup success font-large-2 float-right"></i>
                </div>
              </div>
              <div className="progress mt-1 mb-0">
                 {/* style="height: 7px;"> */}
                <div className="progress-bar bg-success" role="progressbar" 
                // style="width: 60%" 
                aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 col-12 p-3">
        <div className="card">
          <div className="card-content">
            <div className="card-body">
              <div className="media d-flex">
                <div className="media-body text-left">
                  <h3 className="danger">423</h3>
                  <span>Total Visits</span>
                </div>
                <div className="align-self-center">
                  <i className="icon-direction danger font-large-2 float-right"></i>
                </div>
              </div>
              <div className="progress mt-1 mb-0">
                {/* style="height: 7px;"> */}
                <div className="progress-bar bg-danger" role="progressbar" 
                // style="width: 40%" 
                aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <section id="stats-subtitle">
  <div className="row">
    <div className="col-12 mt-3 mb-1">
      <h4 className="text-uppercase">Statistics With Subtitle</h4>
      <p>Statistics on minimal cards with Title Sub Title.</p>
    </div>
  </div>

  <div className="row">
    <div className="col-xl-6 col-md-12 p-2">
      <div className="card overflow-hidden">
        <div className="card-content">
          <div className="card-body cleartfix">
            <div className="media align-items-stretch">
              <div className="align-self-center">
                <i className="icon-pencil primary font-large-2 mr-2"></i>
              </div>
              <div className="media-body">
                <h4>Total Posts</h4>
                <span>Monthly blog posts</span>
              </div>
              <div className="align-self-center">
                <h1>18,000</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="col-xl-6 col-md-12 p-2">
      <div className="card">
        <div className="card-content">
          <div className="card-body cleartfix">
            <div className="media align-items-stretch">
              <div className="align-self-center">
                <i className="icon-speech warning font-large-2 mr-2"></i>
              </div>
              <div className="media-body">
                <h4>Total Comments</h4>
                <span>Monthly blog comments</span>
              </div>
              <div className="align-self-center"> 
                <h1>84,695</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="row">
    <div className="col-xl-6 col-md-12 p-2">
      <div className="card">
        <div className="card-content">
          <div className="card-body cleartfix">
            <div className="media align-items-stretch">
              <div className="align-self-center">
                <h1 className="mr-2">$76,456.00</h1>
              </div>
              <div className="media-body">
                <h4>Total Sales</h4>
                <span>Monthly Sales Amount</span>
              </div>
              <div className="align-self-center">
                <i className="icon-heart danger font-large-2"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="col-xl-6 col-md-12 p-2">
      <div className="card">
        <div className="card-content">
          <div className="card-body cleartfix">
            <div className="media align-items-stretch">
              <div className="align-self-center">
                <h1 className="mr-2">$36,000.00</h1>
              </div>
              <div className="media-body">
                <h4>Total Cost</h4>
                <span>Monthly Cost</span>
              </div>
              <div className="align-self-end">
              <FontAwesomeIcon icon={faWallet} className="success" size="lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Dashboard
