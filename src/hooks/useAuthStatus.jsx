import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export function useAuthStatus() {
  const [isLogged, setIsLogged] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged((prevState) => (prevState = true));
      }
      setCheckingStatus((prevState) => (prevState = false));
    });
  });
  return { isLogged, checkingStatus };
}
