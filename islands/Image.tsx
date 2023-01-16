import { FunctionalComponent } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

interface ImageComponentProps {
  src: string;
  alt: string;
  className: string;
}

const Image: FunctionalComponent<ImageComponentProps> = (
  { src, alt, className },
) => {
  const ref = useRef<HTMLImageElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    console.log(className);

    const observer = new IntersectionObserver((entries) => {
      const { isIntersecting } = entries[0];
      if (isIntersecting) {
        setInView(isIntersecting);
        observer.disconnect();
      }
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, [ref]);

  return (
    <div ref={ref}>
      {inView && (
        <img
          class={className}
          src={src}
          alt=''
          ref={ref}
        />
      )}
    </div>
  );
};

export default Image;
