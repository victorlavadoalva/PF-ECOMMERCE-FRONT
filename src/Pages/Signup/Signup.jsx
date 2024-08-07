import React, { useEffect, useState } from "react";
import { RiLockPasswordLine, RiMailLine, RiUser3Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingForm, LoginGoogle } from "../../Components";
import { StyledLink } from "../../ComponentsStyles";
import { LoadingActionForm, signup } from "../../Redux/Actions";
import styles from "./Signup.module.css";
import { validateLoginForm } from "./validate";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loadingLoagin_Register, errorsBack } = useSelector(
    (state) => state
  );

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    picture: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        setValues({
          name: "",
          email: "",
          password: "",
        });
        dispatch(LoadingActionForm(false));
        navigate("/");
      }, 500);
    }

    if (errorsBack) {
      console.log(errorsBack);
      const { errorRegister } = errorsBack;
      console.log(errorRegister);
      setTimeout(() => {
        if (errorRegister) {
          dispatch(LoadingActionForm(false));
          const validationErrors = validateLoginForm(
            values.name,
            values.email,
            values.password,
            errorRegister.message
          );
          setErrors(validationErrors);
        }
      }, 1000);
    }
  }, [user, errorsBack]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = values;

    const validationErrors = validateLoginForm(name, email, password);
    setErrors(validationErrors);

    console.log(errors, "errors");
    if (Object.keys(validationErrors).length !== 0) {
      return null;
    }

    dispatch(LoadingActionForm(true));
    dispatch(signup({ name, email, password }));
    setErrors({});
  };

  return (
    <div className={styles.DivContainerForm}>
      {loadingLoagin_Register && (
        <div className={styles.loading}>
          <LoadingForm />
        </div>
      )}
      <div className={styles.DivForm}>
        {errors.picture && <p className={styles.errors}>{errors.picture}</p>}

        <form className={styles.formhtml} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <RiUser3Line className={styles.inputIcon} />
            <input
              type="text"
              placeholder="Name..."
              value={values.name}
              name="name"
              onChange={handleInputChange}
            />
          </div>
          {errors.name && <p className={styles.errors}>{errors.name}</p>}

          <div className={styles.inputGroup}>
            <RiMailLine className={styles.inputIcon} />
            <input
              type="text"
              placeholder="Email..."
              value={values.email}
              name="email"
              onChange={handleInputChange}
            />
          </div>
          {errors.email && <p className={styles.errors}>{errors.email}</p>}

          <div className={styles.inputGroup}>
            <RiLockPasswordLine className={styles.inputIcon} />
            <input
              type="password"
              placeholder="Password..."
              value={values.password}
              name="password"
              onChange={handleInputChange}
            />
          </div>
          {errors.password && (
            <p className={styles.errors}>{errors.password}</p>
          )}

          <div className={styles.actions}>
            <button className={styles.cancel} onClick={() => navigate("/")}>
              <b>Cancel</b>
            </button>
            <button type="submit" className={styles.submitButton}>
              Create Account
            </button>
          </div>
        </form>
        <div className={styles.separador}>
          <hr />
          <label>O</label>
          <hr />
        </div>
        <LoginGoogle />
        <p className={styles.signup}>
          You have an account? <StyledLink to="/login">Login</StyledLink>
        </p>
      </div>
    </div>
  );
}

export default Signup;
