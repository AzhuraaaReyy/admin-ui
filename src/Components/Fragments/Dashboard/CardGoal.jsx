import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Elements/Card";
import { Icon } from "../../Elements/Icon";
import CompositionExample from "../../Elements/GaugeChart";

const CardGoal = () => {
  const [goals, setGoals] = useState({ presentAmount: 0, targetAmount: 0 });
  const [loading, setLoading] = useState(true); // State untuk loader
  const chartValue = (goals.presentAmount * 100) / goals.targetAmount;

  const getData = async () => {
    setLoading(true); // Mulai loading
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      const response = await axios.get(
        "https://jwt-auth-eight-neon.vercel.app/goals",
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      setGoals({
        presentAmount: response.data.data[0].present_amount,
        targetAmount: response.data.data[0].target_amount,
      });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          console.error("Session expired, please log in again.");
          localStorage.removeItem("refreshToken");
        } else {
          console.error(error.response);
        }
      }
    } finally {
      setLoading(false); // Selesai loading
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Card
      title="Goals"
      desc={
        loading ? (
          // Loader Animation ditempatkan lebih bawah
          <div className="flex justify-center items-end h-32">
            {" "}
            {/* Perubahan di sini */}
            <div className="w-8 h-8 border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          // Konten jika data sudah berhasil dimuat
          <div className="p-2">
            <div className="flex justify-between">
              <div className="flex">
                <span className="text-2xl font-bold me-4 self-center">
                  ${goals.presentAmount}
                </span>
                <div className="p-2 bg-gray-05 rounded-md box-border">
                  <Icon.EditIcon />
                </div>
              </div>
              <div>Nov, 2023</div>
            </div>
            <div className="border-b-2 my-4"></div>
            <div className="flex justify-between">
              <div>
                <div className="flex mt-3 mb-10">
                  <div>
                    <Icon.AwardIcon />
                  </div>
                  <div className="ms-2">
                    <span className="text-gray-02">Target Achieved</span>
                    <br />
                    <span className="font-bold text-xl">
                      ${goals.targetAmount}
                    </span>
                  </div>
                </div>
                <div className="flex">
                  <div>
                    <Icon.TargetIcon />
                  </div>
                  <div className="ms-2">
                    <span className="text-gray-02">This Month Target</span>
                    <br />
                    <span className="font-bold text-xl">
                      ${goals.presentAmount}
                    </span>
                  </div>
                </div>
              </div>
              <div className="ms-4 text-center">
                <CompositionExample desc={chartValue} />
                <div className="flex justify-between">
                  <span className="text-gray-03">$0</span>
                  <span className="font-bold text-2xl">12K</span>
                  <span className="text-gray-03">$20K</span>
                </div>
                <div className="mt-2">Target vs Achievement</div>
              </div>
            </div>
          </div>
        )
      }
    />
  );
};

export default CardGoal;
