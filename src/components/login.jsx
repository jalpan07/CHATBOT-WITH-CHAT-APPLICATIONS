// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase"; // Import Firebase authentication

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(false);

//     try {
//       // Attempt to sign in with email and password
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate("/"); // Navigate to home page after successful login
//     } catch (err) {
//       setError(true); // Set error state if login fails
//     }
//   };

//   return (
//     <div className="loginContainer">
//       <div className="loginWrapper">
//         <span className="logo">Lama Chat</span>
//         <span className="title">Login</span>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Email"
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//           />
//           <button type="submit">Sign in</button>
//           {error && <span>Something went wrong</span>}
//         </form>
//         <p>
//           Don't have an account? <a href="/register">Register</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
