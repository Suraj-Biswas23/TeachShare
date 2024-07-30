import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 text-center md:text-left">
            <p className="text-gray-700">© 2024 TeachShare. All rights reserved.</p>
          </div>
          <div className="w-full md:w-1/3 text-center mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-700 hover:text-blue-600 mx-2">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-700 hover:text-blue-600 mx-2">Terms of Service</Link>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-right mt-4 md:mt-0">
            <a href="#" className="text-gray-700 hover:text-blue-600 mx-2">Facebook</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 mx-2">Twitter</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 mx-2">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}