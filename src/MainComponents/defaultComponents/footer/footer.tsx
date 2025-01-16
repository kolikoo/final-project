import React from "react";

const Footer:React.FC=()=>{
  return (
    <footer className="bg-[#224F34] text-white mt-7 ">
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">ThriftShop</h1>
            <ul className="flex space-x-4 mt-4">
              <li>
                <a href="#" className="hover:text-gray-200">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold mb-2">Shop</h3>
              <ul>
                <li>
                  <a href="#" className="hover:text-gray-200">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-200">
                    Overview
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-200">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-200">
                    Releases
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Company</h3>
              <ul>
                <li>
                  <a href="#" className="hover:text-gray-200">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-200">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-200">
                    News
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-200">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Stay Up To Date</h3>
             
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-sm">
          <p className="text-center">&copy; 2023 Rivo. All rights reserved.</p>
          <ul className="flex justify-center space-x-4 mt-2">
            <li>
              <a href="#" className="hover:text-gray-200">
                Terms
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                Cookies
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
