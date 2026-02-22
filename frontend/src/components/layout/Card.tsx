import { useState } from 'react';
import { MoonLoader } from 'react-spinners';
import Body from './Card/Body';
import { useUser } from '../../context/useUser';

const Card = () => {
    const { user } = useUser()
    const [isLoading, setIsLoading] = useState(false)   
    const [error, setError] = useState(false)
    const [text, setText] = useState('')
    return (
        <div className="absolute flex top-4 right-6 md:right-28 w-1/4 p-2 bg-slate-200 rounded-md">
            {isLoading ? (
            <div className='grid mx-auto relative my-[2px] z-40'>
                                    <MoonLoader
                                    color="#000"
                                    size={40}
                                    />
                                </div>
            ) : ( user &&
                <>
                    <img
                    className="md:w-14 rounded-full shadow-md"
                    alt="profile-picture"
                    src={
                        user.pic && user.pic !== ""
                            ? user.pic
                            : "/assets/profile_pictures/default-profile-pic.jpg"
                    }
                    />
                    {error ? (
                        <div className='w-full grid items-center justify-center'>
                            <strong className='px-3 py-2 rounded-full bg-red-600 text-white'>{text}</strong>
                        </div>
                    ) : (
                    <Body setError={setError} setIsLoading={setIsLoading}
                        setText={setText}
                    />
                )}
                    
            </>
            )}
        </div>
    )
}

export default Card