import * as React from "react";

export const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const loggedUser = JSON.parse(userString);
      setUser(loggedUser);
    }
  }, []);

  const handleLogin = async (auth) => {
    if (!auth.userName || !auth.password) return;

    const res = await fetch("http://localhost:4005/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auth),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return { success: false, message: data.message };
    }
    if (res.ok) {
      setUser(data);
      setError("");
      localStorage.setItem("user", JSON.stringify(data));
      return { success: true, message: "User logged in successfully" };
    }
  };

  const handleLogout = async () => {
    try {
      setUser(null);
      localStorage.removeItem("user");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignup = async (auth) => {
    const res = await fetch("http://localhost:4005/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auth),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return { success: false, message: data.message };
    }
    if (res.ok) {
      setUser(data);
      setError("");
      return { success: true, message: "User signed up successfully" };
    }
  };

  return (
    <AuthContext.Provider
      value={{ error, user, handleLogin, handleSignup, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
