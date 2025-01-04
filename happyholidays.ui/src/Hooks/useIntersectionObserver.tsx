import { useState, useEffect, useRef } from "react";

export interface UseIntersectionObserverProps {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
}

const useIntersectionObserver = (options: UseIntersectionObserverProps = {}): [React.MutableRefObject<null>, boolean] => {
    const { root = null, rootMargin = "0px", threshold = 0 } = options;
    const [isIntersecting, setIsIntersecting] = useState(false);
    const targetRef = useRef<null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            { root, rootMargin, threshold }
        );

        const target = targetRef.current;

        if (target) {
            observer.observe(target);
        }

        return () => {
            if (target) {
                observer.unobserve(target);
            }
        };
    }, [root, rootMargin, threshold]);

    return [targetRef, isIntersecting]
}

export default useIntersectionObserver;