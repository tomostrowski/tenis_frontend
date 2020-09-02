import React, {Component} from "react";


export class Login extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="page-height">
                    <h1>Strona logowania</h1>
                    <div className="center">
                        <form className="background-layer">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Twój e-mail</label>
                                <input type="email" className="form-control" id="exampleInputEmail1"
                                       aria-describedby="emailHelp"/>
                                <div id="emailHelp" className="form-text text-muted">Nigdy nie udostępnimy Twojego
                                    maila.
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Hasło</label>
                                <input type="password" className="form-control" id="exampleInputPassword1"/>
                            </div>
                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                <label className="form-check-label" htmlFor="exampleCheck1">Zapoznałem się z
                                    regulaminem</label>
                            </div>
                            <button type="submit" className="submit">Zaloguj</button>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;

