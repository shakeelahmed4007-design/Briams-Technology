import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useBrand } from "../../hooks/useBrand";

export default function BrandSync() {
  const location = useLocation();
  const { setBrand } = useBrand();

  useEffect(() => {
    if (location.pathname.startsWith("/products/curevirtual")) {
      setBrand("cure");
    } else {
      setBrand("briams");
    }
  }, [location.pathname, setBrand]);

  return null;
}
