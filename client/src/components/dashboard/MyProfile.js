import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { loadUser, updateUser } from "../../actions/auth";
import { setAlert } from "../../actions/alert";

const MyProfile = ({
  updateUser,
  loadUser,
  loading,
  user,
  isAuthenticated,
  setAlert,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { email, name, password, password2 } = formData;
  const [displayChangePassword, toggleChangePassword] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user == null) {
      loadUser();
      return <Redirect to="/login" />;
    }
    setFormData({
      name: user.data.name,
      email: user.data.email,
    });
  }, [loading]);

  const onChange = (e) => {
    loadUser();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!displayChangePassword) {
      updateUser({ name, email });
      setAlert("Tu información ha sido modificada", "success");
    } else {
      if (password !== password2) {
        setAlert("Las contraseñas no coinciden", "danger");
      } else {
        updateUser({ name, email, password });
        setAlert("Tu información ha sido modificada", "success");
      }
    }
  };
  return (
    <Fragment>
      {" "}
      <h1 className="large text-primary">Edit Profile</h1>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            // required
          />
        </div>
        <div className="form-group">
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => toggleChangePassword(!displayChangePassword)}
          >
            Change Password
          </button>
        </div>
        {displayChangePassword && (
          <Fragment>
            <div className="form-group">
              <input
                type="password"
                placeholder="New password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
                // required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Repeat new password"
                name="password2"
                value={password2}
                onChange={(e) => onChange(e)}
                // required
              />
            </div>
          </Fragment>
        )}
        <input type="submit" className="btn btn-primary" value="Save" />
      </form>
    </Fragment>
  );
};

MyProfile.propTypes = {
  user: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  loadUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  loading: PropTypes.object.isRequired,
});

export default connect(mapStateToProps, { loadUser, updateUser, setAlert })(
  MyProfile
);
