import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularProgressBar = ({vote , h , w}:any) => {

    const percentage = (vote/10*100).toFixed(0);

    let colour =  percentage >= 70 ? "#09ED24" : percentage < 70 && percentage >= 40 ? "#FCF703" :'red'

//     if(percentage >= 70){
//         colour = "09ED24"
//     }
//    else if(percentage < 70 &&  >= 40){

//    }



  return (
    <div  className={`h-${h} w-${w}  text-white bg-sky-950 rounded-full p-1 hover:scale-110 cursor-pointer`}>
        <CircularProgressbar value={percentage}  text={`${percentage}%`} strokeWidth={7} styles={buildStyles({textColor: 'white' , textSize : '25px' ,trailColor: "#19261C" , pathColor: colour})}/>
    </div>
  )
}

export default CircularProgressBar