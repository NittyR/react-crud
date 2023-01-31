import React  from 'react';

export class Employee extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            usersName: "",
            usersSurName: "",
            DateOfBirth: "",
            CompanyTaxID: 0,
            CompanyName: "",
            Email:"",
            AddressName : ""
        }
    }

    refreshList() {

        fetch(variables.API_URL + 'UserInfo/GetUserInfo')
            .then(response => response.json())
            .then(data => {
                this.setState({ userinfo: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeUserInfo= (e) => {
        this.setState({ UserName: e.target.value });
    }
    addClick() {
        this.setState({
            modalTitle: "Add User Information",
            ID: 0,
            usersName: "",
            usersSurName: "",
            DateOfBirth: ""
        });
    }
    editClick(userinfo) {
        debugger;
        this.setState({
            modalTitle: "Edit User Information",
            usersName: userinfo.Name_Eng,
            usersSurName: userinfo.Surname_Eng,
            DateOfBirth: userinfo.DateOfBirth,

        });
    }

    createClick() {
        fetch(variables.API_URL + 'UserInfo/AddUserInfo', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usersName: userinfo.Name_Eng,
                usersSurName: userinfo.Surname_Eng,
                DateOfBirth: userinfo.DateOfBirth
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }


    updateClick() {
        fetch(variables.API_URL + 'UserInfo/UpdateUserInfo', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               usersName: userinfo.Name_Eng,
                usersSurName: userinfo.Surname_Eng,
                DateOfBirth: userinfo.DateOfBirth
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch(variables.API_URL + 'UserInfo/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }

 
    render() {
        const {
            usersName,
            usersSurName,
            DateOfBirth,
        } = this.state;

        return (
            <div>

                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add User Information
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                User Name
                            </th>
                            <th>
                                Surname
                            </th>
                            <th>
                            DateOfBirth
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userinfo.map(uinf =>
                            <tr key={uinf.usersName}>
                                <td>{uinf.usersSurName}</td>
                                <td>{uinf.DateOfBirth}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(uinf)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>

                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(uinf.usersName)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="d-flex flex-row bd-highlight mb-3">

                                    <div className="p-2 w-50 bd-highlight">

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">User Name</span>
                                            <input type="text" className="form-control"
                                                value={usersName}
                                                onChange={this.changeUserInfo} />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Department</span>
                                            <select className="form-select"
                                                onChange={this.changeUserInfo}
                                                value={usersSurName}>
                                                {usersSurName.map(uinf =>
                                                    <option>
                                                        {uinf.usersSurName}
                                                    </option>)}
                                            </select>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">DOJ</span>
                                            <input type="date" className="form-control"
                                                value={DateOfBirth}/>
                                        </div>


                                    </div>
                                    
                                </div>

                                {ID === 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                    : null}

                                {ID !== 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}
                                    >Update</button>
                                    : null}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}