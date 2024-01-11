"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";




export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
            
        } catch (error:any) {
            console.log("Signup failed", error.message);
            
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
      <div className="flex items-center justify-center h-screen">
  <div className="bg-emerald-500 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80 text-black">
    <h1 className="text-2xl mb-4">{loading ? "Processing" : "Signup"}</h1>
    <hr className="mb-4" />
    <label htmlFor="username">Username</label>
    <input
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      id="username"
      type="text"
      value={user.username}
      onChange={(e) => setUser({ ...user, username: e.target.value })}
      placeholder="Username"
    />
    <label htmlFor="email">Email</label>
    <input
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      id="email"
      type="text"
      value={user.email}
      onChange={(e) => setUser({ ...user, email: e.target.value })}
      placeholder="Email"
    />
    <label htmlFor="password">Password</label>
    <input
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      id="password"
      type="password"
      value={user.password}
      onChange={(e) => setUser({ ...user, password: e.target.value })}
      placeholder="Password"
    />
    <button
      onClick={onSignup}
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      disabled={buttonDisabled}
    >
      {buttonDisabled ? "No signup" : "Signup"}
    </button>
    <Link href="/login" className="p-4">
      Visit login page
    </Link>
  </div>
</div>

    )

}