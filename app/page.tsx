import TopCategories from "@/components/Categories";
import GlobalStats from "@/components/GlobalStats";
import TrendingCoinsTable from "@/components/TrendingCoinsTable";

export default function Home() {
  return (
    <div className="container mx-auto p-2 ">
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols- gap-3">
        <GlobalStats />
        <TrendingCoinsTable />
      </div>
        <TopCategories />

    </div>
  );
}
