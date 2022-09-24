
import { useState } from "react";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
      isShowing ? setIsShowing(false) : setIsShowing(true);
  }

  return {
    isShowing,
    toggle
  };
};

export default useModal;