import { useEffect } from "react";

export function useFocusLock(ref: any, active: boolean) {
  useEffect(() => {
    if (active && ref?.current) ref.current.focus();
  }, [active]);
}
