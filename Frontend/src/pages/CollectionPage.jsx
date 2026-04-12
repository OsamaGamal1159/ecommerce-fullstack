import { useState, useEffect, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar.jsx";
import SortOptions from "../components/Products/SortOptions.jsx";
import ProductGrid from "../components/Products/ProductGrid.jsx";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    setTimeout(() => {
      const fetchProducts = [
        {
          _id: "1",
          name: "Casual Shirt",
          price: 80,
          images: [{ url: "https://picsum.photos/500/500?random=3" }],
        },
        {
          _id: "2",
          name: "Denim Jeans",
          price: 120,
          images: [{ url: "https://picsum.photos/500/500?random=4" }],
        },
        {
          _id: "3",
          name: "Denim Jeans",
          price: 120,
          images: [{ url: "https://picsum.photos/500/500?random=5" }],
        },
        {
          _id: "4",
          name: "Denim Jeans",
          price: 120,
          images: [{ url: "https://picsum.photos/500/500?random=6" }],
        },
        {
          _id: "5",
          name: "Denim Jeans",
          price: 120,
          images: [{ url: "https://picsum.photos/500/500?random=7" }],
        },
        {
          _id: "6",
          name: "Denim Jeans",
          price: 120,
          images: [{ url: "https://picsum.photos/500/500?random=8" }],
        },
        {
          _id: "7",
          name: "Denim Jeans",
          price: 120,
          images: [{ url: "https://picsum.photos/500/500?random=9" }],
        },
        {
          _id: "8",
          name: "Denim Jeans",
          price: 120,
          images: [{ url: "https://picsum.photos/500/500?random=10" }],
        },
      ];
      setProducts(fetchProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filter button  */}
      <button
        className="lg:hidden border p-2 flex justify-center items-center"
        onClick={toggleSidebar}
      >
        <FaFilter className="mr-2" /> Filters
      </button>
      {/* Filter sidebar  */}
      <div
        ref={sidebarRef}
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full "} fixed inset-y-0 z-50 left-0 w-64
       bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 `}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection </h2>

        {/* Sort Collection  */}
        <SortOptions />
        {/* Product Grid  */}
       <ProductGrid product={products} />

      </div>
    </div>
  );
};

export default CollectionPage;
