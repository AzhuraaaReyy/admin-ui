import Card from "../Components/Elements/Card";
import MainLayout from "../Components/Layouts/MainLayout";

const DashboardPage = () => {
  return (
    <MainLayout type="dashboard">
      {/* top content start*/}
      <div className="md:grid md:grid-cols-3 md:gap-x-6">
        <Card title="Total Balance" />
        <Card
          title="Goals"
          desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam dolore sapiente suscipit nam, vel officia ipsam praesentium earum unde provident nisi corrupti sit? Officia minima maxime magni quaerat id exercitationem."
        />
        <Card title="Upcoming Bill" />
        <Card
          variant="md:col-span-1 md:row-span-2"
          title="Recent Transaction"
          desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic at ab, voluptates doloribus voluptatum vitae similique perspiciatis sint doloremque consequatur nisi, ut assumenda reprehenderit beatae tempore deleniti quo odit iusto.. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic at ab, voluptates doloribus voluptatum vitae similique perspiciatis sint doloremque consequatur nisi, ut assumenda reprehenderit beatae tempore deleniti quo odit iusto."
        />
        <Card variant="md:col-span-2" title="Statistics" />
        <Card variant="md:col-span-2" title="Expenses Breakdown" />
      </div>
      {/* bottom content end*/}
    </MainLayout>
  );
};

export default DashboardPage;
