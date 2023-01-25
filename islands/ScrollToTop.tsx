import { useEffect, useState } from 'preact/hooks';
import { FunctionalComponent } from 'preact';
import ArrowUpIcon from 'tabler-icon/arrow-up.tsx';

const ScrollToTop: FunctionalComponent = () => {
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    self.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScrollEvent = () => {
      setVisible(self.scrollY > 200);
    };
    self.addEventListener('scroll', handleScrollEvent);
    handleScrollEvent();

    return () => {
      self.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  return (
    <button
      onClick={handleScroll}
      class={`${
        visible ? 'block' : 'hidden'
      } fixed bottom-10 right-10 rounded-xl focus:outline-none active:outline-none bg-pink p-3 border-none`}
    >
      <ArrowUpIcon />
    </button>
  );
};

export default ScrollToTop;
