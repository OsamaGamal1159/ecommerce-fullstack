import React from "react";

const Footer = () => {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6 lg:px-0">
        <div>
          <h3 className="text-lg text-gray-500 mb-4"> Newasletter</h3>
          <p className="text-gray-500 mb-4">
            Be the first to hear about new products, exclusive events, and
            online offers.
          </p>
          <p>Sing up and get 10% off your first order!</p>
          {/* Newsletter form  */}
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full text-sm border-tborder-l border-b
               border-gray-300 rounded-l-md focus:outline-none focus:ring-2
                focus:ring-gray-500 transition-all"
              required
            ></input>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
