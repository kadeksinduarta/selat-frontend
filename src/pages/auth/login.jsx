"use client";

import { useState } from "react";
import { authPost } from "../../utils/api";
import { useRouter } from "next/router";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await authPost("login", form);

      if (res.token) {
        // Simpan token dan data user ke localStorage
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));

        // Redirect ke home
        router.push("/");
      } else {
        // Menampilkan pesan error dari backend jika ada
        setError(res.message || "Email atau password salah");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Terjadi kesalahan koneksi ke server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login User</h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              placeholder="Masukkan email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              placeholder="Masukkan password"
              required
            />
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>

        {/* Error Alert */}
        {error && <p className="text-center mt-4 text-red-600">{error}</p>}

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Belum punya akun?{" "}
            <Link
              href="/auth/register"
              className="font-semibold text-green-600 hover:text-green-700 transition"
            >
              Daftar di sini
            </Link>
          </p>
        </div>

        {/* Admin Login Link */}
        <div className="mt-4 text-center">
          <Link
            href="/auth/admin-login"
            className="text-sm text-blue-600 hover:text-blue-700 transition"
          >
            Login sebagai Admin →
          </Link>
        </div>
      </div>
    </div>
  );
}
