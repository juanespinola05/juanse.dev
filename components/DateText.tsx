import { FunctionalComponent } from 'preact';
import Text from './Text.tsx';

interface DateTextProps {
  date: Date;
}

const DateText: FunctionalComponent<DateTextProps> = ({ date }) => {
  const formattedDate = new Date(date).toLocaleDateString('es', {
    dateStyle: 'long',
  });
  return (
    <>
      <Text size='xs' className='font-bold'>
        <time>{formattedDate}</time>
      </Text>
    </>
  );
};

export default DateText;
