import { useState, useEffect } from 'react';
import './Timer.css';

const Timer = ({setStatus, pairs}) => {
  const [seconds, setSeconds] = useState(pairs * 3);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(timer);
        alert("You run out of time :(")
        setStatus(0);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [seconds]);

  return (
    <div className='timer'>
        {seconds}
    </div>
  );
}

export default Timer;
