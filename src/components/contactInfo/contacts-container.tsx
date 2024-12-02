import Title from '../title';
import NewDirectMessage from './new-dm';
import ProfileInfo from './profile-info';

const ContactsContainer = () => {
  return (
    <div className='relative h-[100vh] md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full'>
      <div className='pt-3 '>CAF</div>
      <div className='my-5'>
        <div className='flex items-center justify-between px-5 '>
          <Title title={'Direct Messages'} />
          <NewDirectMessage />
        </div>
      </div>

      <div className='flex items-center justify-between my-5 px-5'>
        <Title title={'Channels'} />
      </div>

      <ProfileInfo />
    </div>
  );
};

export default ContactsContainer;
