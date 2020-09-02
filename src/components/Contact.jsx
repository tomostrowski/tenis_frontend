import React, {Component} from "react";

export class Contact extends Component {
    render() {
        return (
            <div className="page-height">
                <h1>Napisz do nas</h1>
                 <div class="container contact-form col-md-6">
                    <form method="post" className="background-layer col-md-6">
                        <div className="form-group">
                            <input
                                type="text"
                                name="txtName"
                                class="form-control"
                                placeholder="Twoje imię *"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="txtEmail"
                                class="form-control"
                                placeholder="Twój Email *"
                            />
                        </div>
                        <div>
                            <div className="form-group">
                    <textarea
                        nameName="txtMsg"
                        class="form-control"
                        placeholder="Twoja wiadomość *"
                    ></textarea>
                            </div>
                            <div className="form-group">
                                <input
                                    type="submit"
                                    name="btnSubmit"
                                    value="Wyślij"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Contact;
