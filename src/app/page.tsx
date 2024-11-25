import Tabs from '@/components/tabs';

const Home = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-[95%] md:w-[50%]   py-5 px-4 text-opacity-90 shadow-2xl bg-white rounded-md'>
        <h1 className='text-xl md:text-2xl font-bold text-center '>
          Chat a Friend
        </h1>
        <p className='text-center text-sm mt-2 font-normal'>
          Fill in the details to get started with the best chat app!
        </p>
        <div className='mt-6'>
          <Tabs />
        </div>
      </div>
    </div>
  );
};

export default Home;
