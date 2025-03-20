import Link from "next/link";

const Insights = () => {
  return (
    <>
      <div className='w-screen py-10 px-5 flex flex-col items-center'>
        <h1 className='text-4xl md:text-3xl mt-3 text-center capitalize font-semibold mb-2  xl:text-[32px] xl:leading-[1.3]'>
          Join our community of 10,000+ super parents
        </h1>

        <div className='mt-12 w-max'>
          <Link
            href={"/child-details"}
            className='gradient-90 px-8 py-4 text-xl text-white rounded-xl'
          >
            Buy Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default Insights;
