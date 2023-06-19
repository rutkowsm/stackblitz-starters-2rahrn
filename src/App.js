import React, { useState, useEffect, useLayoutEffect } from 'react';
import './style.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (running) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [running]);

  const handleStart = () => {
    setRunning(true);
  };

  const handlePause = () => {
    setRunning(false);
  };

  const handleReset = () => {
    setTime(0);
    setRunning(false);
  };

  return (
    <div>
      <h2>Stopwatch</h2>
      <p>Time: {time}</p>
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

const WindowSizeTracker = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    document.body.style.backgroundColor =
      windowSize.width > windowSize.height ? 'lightgreen' : 'lightblue';
  }, [windowSize]);

  return (
    <div>
      <h2>Window Size Tracker</h2>
      <p>Width: {windowSize.width}</p>
      <p>Height: {windowSize.height}</p>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Stopwatch />
      <WindowSizeTracker />
    </div>
  );
};

export default App;
