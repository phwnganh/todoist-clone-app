import {type RefObject, useEffect} from "react";

type UseClickOutsideParams<T extends HTMLElement> = {
    ref: RefObject<T | null>;
    handler: () => void;
    enabled?: boolean;
}

export function useClickOutside<T extends HTMLDivElement | HTMLButtonElement>({ref, handler, enabled = true}: UseClickOutsideParams<T>) {
    useEffect(() => {
        if(!enabled) return;

        const listener = (e: MouseEvent | TouchEvent) => {
            if(!ref.current) return;

            if(ref.current.contains(e.target as Node)){
                return;
            }
            handler();
        }

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        }
    }, [ref, handler, enabled]);
}