import {FaFacebookF , FaInstagram , FaTwitter , FaYoutube} from 'react-icons/fa'

const Footer = ():JSX.Element => {
  return (
    <div className=' pt-24 pb-5 w-2/3 mx-auto'>
        <div className='flex text-white text-2xl w-52 justify-between pb-6 pl-4'>
            <span className='cursor-pointer'><FaFacebookF/></span>
            <span className='cursor-pointer'><FaInstagram/></span>
            <span className='cursor-pointer'><FaTwitter/></span>
            <span className='cursor-pointer'><FaYoutube/></span>
        </div>
        <div className='flex justify-between flex-wrap'>
            <div className='text-sm text-gray-500 font-light'>
                <p className='py-1 cursor-pointer hover:underline'>Audio description</p>
                <p className='py-1 cursor-pointer hover:underline'>Investor Relation</p>
                <p className='py-1 cursor-pointer hover:underline'>Legal Notices</p>
                <button className='border py-1 px-3 my-5 cursor-pointer hover:text-white'>Service Code</button>
                <p className='text-xs'> &#169; 2023 all Right Reserved</p>
            </div>
            <div className='text-sm text-gray-500 font-light'>
                <p className='py-1 cursor-pointer hover:underline'>Help Center</p>
                <p className='py-1 cursor-pointer hover:underline'>Jobs</p>
                <p className='py-1 cursor-pointer hover:underline'>Cookie Preferences</p>
            </div>
            <div className='text-sm text-gray-500 font-light'>
                <p className='py-1 cursor-pointer hover:underline'>Gift Cards</p>
                <p className='py-1 cursor-pointer hover:underline'>Term and Use</p>
                <p className='py-1 cursor-pointer hover:underline'>Corporate Information</p>
            </div>
            <div className='text-sm text-gray-500 font-light'>
                <p className='py-1 cursor-pointer hover:underline'>Media Center</p>
                <p className='py-1 cursor-pointer hover:underline'>Privacy</p>
                <p className='py-1 cursor-pointer hover:underline'>Contact Us</p>
            </div>
        </div>
    </div>
  )
}

export default Footer