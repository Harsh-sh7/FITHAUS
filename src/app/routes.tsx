import { createBrowserRouter } from "react-router";
import ShopFeed from "./pages/ShopFeed";
import Home from "./pages/Home";
import BuildFit from "./pages/BuildFit";
import Wishlist from "./pages/Wishlist";
import BrandProfile from "./pages/BrandProfile";
import DiscoverBrands from "./pages/DiscoverBrands";
import ProductDetails from "./pages/ProductDetails";
import Feed from "./pages/Feed";
import Discover from "./pages/Discover";
import CreatorProfile from "./pages/CreatorProfile";
import UploadFit from "./pages/UploadFit";
import Checkout from "./pages/Checkout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: ShopFeed,
  },
  {
    path: "/feed",
    Component: Feed,
  },
  {
    path: "/shop",
    Component: Home,
  },
  {
    path: "/build-fit",
    Component: BuildFit,
  },
  {
    path: "/wishlist",
    Component: Wishlist,
  },
  {
    path: "/brand/:brandId",
    Component: BrandProfile,
  },
  {
    path: "/discover",
    Component: DiscoverBrands,
  },
  {
    path: "/discover/creators",
    Component: Discover,
  },
  {
    path: "/creator/:creatorId",
    Component: CreatorProfile,
  },
  {
    path: "/upload",
    Component: UploadFit,
  },
  {
    path: "/checkout",
    Component: Checkout,
  },
  {
    path: "/product/:productId",
    Component: ProductDetails,
  },
]);