import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "../../Elements/Card";
import { AuthContext } from "../../../Context/authContext";

const UpcomingBills = () => {
  const [bills, setBills] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setIsLoggedIn, setName } = useContext(AuthContext);

  // Fungsi untuk mengambil data upcoming bills
  const getData = async () => {
    const token = localStorage.getItem("refreshToken");
    console.log("Token yang ditemukan:", token);

    if (!token) {
      console.error("Tidak ada token. Silakan login terlebih dahulu.");
      setError("Tidak ada token. Silakan login terlebih dahulu.");
      return;
    }

    try {
      const response = await axios.get(
        "https://jwt-auth-eight-neon.vercel.app/bills",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Respons API:", response);

      // Ambil data dari properti `data`
      if (response.data && Array.isArray(response.data.data)) {
        setBills(response.data.data); // Properti `data` di dalam respons API
        console.log("Data tagihan berhasil disimpan:", response.data.data);
      } else {
        console.error(
          "Respons tidak sesuai format yang diharapkan:",
          response.data
        );
        setError("Format respons API tidak valid.");
      }
    } catch (err) {
      console.error("Gagal mengambil data upcoming bills:", err);

      if (err.response?.status === 401) {
        console.error(
          "Sesi telah kedaluwarsa. Mengarahkan ke halaman login..."
        );
        handleSessionExpired();
      } else {
        setError("Gagal mengambil data upcoming bills. Silakan coba lagi.");
      }
    }
  };

  const handleSessionExpired = () => {
    setIsLoggedIn(false);
    setName("");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  useEffect(() => {
    getData();
  }, []);

  // Menampilkan data tagihan jika tidak ada error
  const billCard =
    bills.length > 0 ? (
      bills.map((bill) => (
        <div key={bill.id} className="lg:flex justify-between pt-3 pb-3">
          <div className="flex">
            <div className="bg-special-bg me-3 px-4 rounded-lg flex place-content-center flex-col">
              <span className="text-xs">{bill.month}</span>
              <span className="text-2xl font-bold">{bill.date}</span>
            </div>
            <div className="">
              <img
                className="h-6"
                src={`/images/${bill.logo}`}
                alt={bill.name}
              />
              <span className="font-bold">{bill.name}</span>
              <br />
              <span className="text-xs">Last Charge - {bill.lastCharge}</span>
            </div>
          </div>
          <div className="flex place-content-center flex-col">
            <span className="p-2 border rounded-lg font-bold text-center">
              ${bill.amount}
            </span>
          </div>
        </div>
      ))
    ) : (
      <p>No upcoming bills available</p>
    );

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <Card title="Upcoming Bill" desc={billCard} />
    </div>
  );
};

export default UpcomingBills;
