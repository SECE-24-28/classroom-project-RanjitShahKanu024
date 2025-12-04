import React from "react";

const Navbar = () => {
  return (
    <nav>
      <h1>🙋🏻‍♀️WELCOME TO THE 🙋🏻‍♂️</h1>
      <h1>My MERN App</h1>
      <form
        style={{
          width: "400px",
          margin: "20px auto",
          border: "1px solid #000",
          padding: "20px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Name:</label>
          <input
            type="text"
            style={{ width: "100%", height: "40px", fontSize: "16px" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Address:
          </label>
          <input
            type="text"
            style={{ width: "100%", height: "40px", fontSize: "16px" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Email:
          </label>
          <input
            type="email"
            style={{ width: "100%", height: "40px", fontSize: "16px" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Phone:
          </label>
          <input
            type="tel"
            style={{ width: "100%", height: "40px", fontSize: "16px" }}
          />
        </div>

        <button
          type="submit"
          style={{ width: "100%", height: "45px", fontSize: "16px" }}
        >
          Submit
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
