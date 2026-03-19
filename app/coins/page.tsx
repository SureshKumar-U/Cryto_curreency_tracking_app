import AllCoins from "@/components/AllCoins";

export default function Page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const pageNo = Number(searchParams.page || "1");

  return <AllCoins pageNo={pageNo} />;
}