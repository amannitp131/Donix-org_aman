import Image from "next/image"; 
import errorimage from '../../public/image.png'
import Link from "next/link";
import { TbFaceIdError } from "react-icons/tb";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
     <header className="w-full text-center py-6 font-bold text-8xl flex items-center justify-center gap-2">
  404 NOT FOUND <i className="text-4xl text-blue-500 pl-8 pt-2"><TbFaceIdError size={90} /></i>
</header>
      <section className="flex flex-col md:flex-row items-center justify-center mt-20 px-6 md:px-16 lg:px-24">
          <div className="image flex justify-center md:w-1/2">
            <Image
              src={errorimage} 
              alt="signal"
              className="w-80 md:w-96 animate-pulse"
              width={384} 
              height={384} 
            />
          </div>
          <div className="text flex flex-col items-center md:items-start md:w-1/2 gap-6 text-center md:text-left">
            <p className="text-lg md:text-xl w-3/4 md:w-2/3">
              The page you were looking for does not exist or is temporarily unavailable.
            </p>
            <Link
              href="/"
              className="text-black bg-white px-6 py-3 rounded-md transition duration-300 hover:bg-black hover:text-white border border-black"
            >
              Back to Homepage
              </Link>
          </div>
      </section>
    </div>
  );
};

export default NotFoundPage;