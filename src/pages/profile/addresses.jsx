import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MainLayout from "../layouts/MainLayout";
import {
  MapPin,
  Plus,
  Edit2,
  Trash2,
  Star,
  X,
  CheckCircle,
} from "lucide-react";
import { userGet, userPost, userPut, userDelete } from "../../utils/api";

const AddressFormModal = ({
  isOpen,
  onClose,
  initialData,
  onSuccess,
  token,
}) => {
  const [form, setForm] = useState({
    label: "",
    recipient_name: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postal_code: "",
    is_default: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Reset form when modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({
          label: "",
          recipient_name: "",
          phone: "",
          address: "",
          city: "",
          province: "",
          postal_code: "",
          is_default: false,
        });
      }
      setMessage("");
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData) {
        await userPut(`addresses/${initialData.id}`, form, token);
      } else {
        await userPost("addresses", form, token);
      }
      setMessage(
        initialData ? "Alamat berhasil diupdate" : "Alamat berhasil ditambahkan"
      );
      setMessageType("success");
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessage("Terjadi kesalahan. Silakan coba lagi.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            {initialData ? "Edit Alamat" : "Tambah Alamat Baru"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {message && (
            <div
              className={`p-4 rounded-lg flex items-center gap-3 ${
                messageType === "success"
                  ? "bg-green-50 border border-green-200 text-green-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}
            >
              {messageType === "success" && (
                <CheckCircle size={20} className="flex-shrink-0" />
              )}
              <p className="text-sm">{message}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Label <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="label"
                value={form.label}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Rumah, Kantor, dll"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nama Penerima <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="recipient_name"
                value={form.recipient_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nomor Telepon <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Alamat Lengkap <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="3"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kota <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Provinsi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="province"
                value={form.province}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kode Pos <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="postal_code"
                value={form.postal_code}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_default"
              name="is_default"
              checked={form.is_default}
              onChange={handleChange}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="is_default" className="text-sm text-gray-700">
              Jadikan alamat default
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : initialData ? "Update" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function AddressesPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/auth/login");
        return;
      }

      const res = await userGet("addresses", token);
      // Ensure addresses is an array
      const data = Array.isArray(res) ? res : res.data || [];
      // Sort: Default address first
      const sortedData = Array.isArray(data)
        ? data.sort((a, b) => (b.is_default ? 1 : 0) - (a.is_default ? 1 : 0))
        : [];
      setAddresses(sortedData);
    } catch (error) {
      console.error("Error loading addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (address = null) => {
    setEditingAddress(address);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAddress(null);
  };

  const handleSuccess = () => {
    loadAddresses();
  };

  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus alamat ini?")) return;

    const token = localStorage.getItem("token");
    try {
      await userDelete(`addresses/${id}`, token);
      loadAddresses();
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleSetDefault = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await userPost(`addresses/${id}/set-default`, {}, token);
      loadAddresses();
    } catch (error) {
      console.error("Error setting default:", error);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Alamat Saya</h1>
              <p className="text-gray-600 mt-2">
                Kelola alamat pengiriman Anda
              </p>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <Plus size={20} />
              <span>Tambah Alamat</span>
            </button>
          </div>

          {/* Addresses List */}
          {addresses.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Belum Ada Alamat
              </h3>
              <p className="text-gray-600 mb-6">
                Tambahkan alamat pengiriman Anda
              </p>
              <button
                onClick={() => handleOpenModal()}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Tambah Alamat
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`bg-white rounded-xl shadow-sm p-6 relative border ${
                    address.is_default
                      ? "border-green-500 ring-1 ring-green-500"
                      : "border-gray-200"
                  }`}
                >
                  {address.is_default && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        <Star size={14} fill="currentColor" />
                        Default
                      </span>
                    </div>
                  )}

                  <div className="pr-24">
                    <div className="flex items-start gap-3 mb-3">
                      <MapPin className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {address.label}
                        </h3>
                        <p className="text-gray-700 mt-1">
                          {address.recipient_name}
                        </p>
                        <p className="text-gray-600 text-sm">{address.phone}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 ml-8">{address.address}</p>
                    <p className="text-gray-600 ml-8">
                      {address.city}, {address.province} {address.postal_code}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-4 ml-8">
                    <button
                      onClick={() => handleOpenModal(address)}
                      className="flex items-center gap-1 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition text-sm"
                    >
                      <Edit2 size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition text-sm"
                    >
                      <Trash2 size={14} />
                      Hapus
                    </button>
                    {!address.is_default && (
                      <button
                        onClick={() => handleSetDefault(address.id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-green-600 hover:bg-green-50 rounded-lg transition text-sm"
                      >
                        <Star size={14} />
                        Jadikan Default
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modal */}
          <AddressFormModal
            isOpen={showModal}
            onClose={handleCloseModal}
            initialData={editingAddress}
            onSuccess={handleSuccess}
            token={
              typeof window !== "undefined" ? localStorage.getItem("token") : ""
            }
          />
        </div>
      </div>
    </MainLayout>
  );
}
