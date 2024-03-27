// import React from 'react'


interface CastImagePropes {
    profile_path : string;
    original_name : string ;
    character : string
}

const CastImageCard = ({profile_path , original_name ,character}:CastImagePropes):JSX.Element => {
  return (
    <div className=' w-[9.3rem] h-64 m-3 rounded-md bg-sky-950'>
        <figure className=" h-[10.7rem]">
            <img src={`https://media.themoviedb.org/t/p/w138_and_h175_face/${profile_path}` }alt="profile" className=" h-full w-full" />
        </figure>
        <div className=" p-4">
            <h1 className=" text-white font-semibold text-[15px]">{original_name.slice(0,12)}</h1>
            <p className=" text-gray-100 font-light text-[11px]">{character}</p>
        </div>
    </div>
  )
}

export default CastImageCard