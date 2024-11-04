import MainLayout from "../Components/Layouts/MainLayout";
import ExpensesCard from "../Components/Elements/Card/expensescard";
import Card from "../Components/Elements/Card";
import Kosong from "../Components/Elements/Card/kosong";
const ExpensesPage = () => {
  return (
    <MainLayout type="expenses">
      {/* Expenses Comparison Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Expenses Comparison</h2>
        <div className="w-full">
          <ExpensesCard />
        </div>
      </div>

      {/* Expenses Breakdown Section */}
      {/* top content start*/}
      <h2 className="text-xl font-semibold mb-2">Expenses Breakdown</h2>
      <div className="mb-4 sm:flex sm:gap-6">
        <div className="mb-4 sm:w-1/3">
          <ExpensesCard />
        </div>
        <div className="mb-4 sm:w-1/3">
          <ExpensesCard />
        </div>
        <div className="mb-4 sm:w-1/3">
          <ExpensesCard />
        </div>
      </div>
      <div className="mb-4 sm:flex sm:gap-6">
        <div className="mb-4 sm:w-1/3">
          <Kosong />
        </div>
        <div className="mb-4 sm:w-1/3">
          <Kosong />
        </div>
        <div className="mb-4 sm:w-1/3">
          <Kosong />
        </div>
      </div>
      {/* top content end*/}
    </MainLayout>
  );
};

export default ExpensesPage;
