import React from "react";

const doctorEdit = () => {
  return (
    <>
      <form className="sign-up-form">
        <h2 className="title">Sign up</h2>
        <IconComponent role={role} setRole={setRole} />
        <div className="input-field">
          <i>
            <FaUser />
          </i>
          <input
            type="text"
            className="focus:ring-0"
            placeholder="Username"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="input-field">
          <i>
            <GrMail />
          </i>
          <input
            type="email"
            className="focus:ring-0"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <PasswordInput
          password={password}
          setPassword={setPassword}
          placeholder={"Password"}
        />
        <input
          type="submit"
          className="btn1"
          value="Sign up"
          onClick={handleRegisterClick}
        />
      </form>
    </>
  );
};

export default doctorEdit;
