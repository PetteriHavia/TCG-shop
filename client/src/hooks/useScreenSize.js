import { useEffect, useState } from "react"

const useScreenSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    heigth: window.innerHeight
  })

  useEffect(() => {
    const handleWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        heigth: window.innerHeight
      });
    };
    window.addEventListener('resize', handleWindowSize);
    return () => {
      window.removeEventListener('resize', handleWindowSize)
    };
  }, [])
  return windowSize;
}

export default useScreenSize;