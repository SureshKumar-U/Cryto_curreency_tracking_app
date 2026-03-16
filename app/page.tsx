import TopCategories from "@/components/Categories";
import TopGainers from "@/components/TopGainers";
import TopLosers from "@/components/TopLosers";
import TrendingCoinsTable from "@/components/TrendingCoinsTable";

export default function Home() {
  return (
    <div className="container mx-auto p-2 ">
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-3">
        <div> <TopGainers />
        </div>
        <div ><TopLosers />
        </div>
        <div>
          <TrendingCoinsTable />
        </div>

      </div>
      <div className="mt-2">
        <TopCategories/>
      </div>



    </div>
  );
}
