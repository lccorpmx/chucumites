import { MenuScreen } from "@/components/menu/menu-screen";
import { getMenu } from "@/lib/menu/data";
import { restaurant } from "@/lib/restaurant";

export default async function MenuPage() {
  const menu = await getMenu();

  return <MenuScreen menu={menu} restaurant={restaurant} />;
}
