import TrendingCoinsTable from "@/components/TrendingCoinsTable";

export default function Home() {
  return (
    <div className="container mx-auto p-2 ">
      <div className="grid grid-cols-5">
        <div className="col-span-3">coin overview</div>
        <div className="col-span-2">
          <TrendingCoinsTable/>
        </div>

      </div>



    </div>
  );
}
