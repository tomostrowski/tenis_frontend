import React, { Component } from "react";


export class Pricing extends Component {
    render() {
        return (
            <React.Fragment>

                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h1 className="display-4">Cennik</h1>
                    <p className="lead">Skorzystaj z systemu do zarządzania Twoją ligą tenisa i zobacz ile czasu zaoszczędzisz</p>
                </div>

                <div className="container mb-5">
                    <div className="card-deck mb-3 text-center">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">Darmowy</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">0zł <small className="text-muted">/
                                    mc</small></h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>3 grupy</li>
                                    <li>2 GB of storage</li>
                                    <li>Email support</li>
                                    <li>Help center access</li>
                                </ul>
                                <button type="button" className="btn btn-lg btn-block btn-outline-green">Zarejestruj się za darmo
                                </button>
                            </div>
                        </div>
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">Pro</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">15zł <small className="text-muted">/
                                    mc</small></h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>20 grup</li>
                                    <li>10 GB of storage</li>
                                    <li>Priority email support</li>
                                    <li>Help center access</li>
                                </ul>
                                <button type="button" className="btn btn-lg btn-block">Zacznij</button>
                            </div>
                        </div>
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">Lux</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">29zł <small className="text-muted">/
                                    mc</small></h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>30 grup</li>
                                    <li>15 GB of storage</li>
                                    <li>Phone and email support</li>
                                    <li>Help center access</li>
                                </ul>
                                <button type="button" className="btn btn-lg btn-block">Contact us</button>
                            </div>
                        </div>
                    </div>
                </div>


            </React.Fragment>
        );
    }
}

export default Pricing;
