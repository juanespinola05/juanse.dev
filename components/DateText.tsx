import { FunctionalComponent } from 'preact'
import Text from './Text.tsx'

interface DateTextProps {
  date: Date
  className?: string
}

const DateText: FunctionalComponent<DateTextProps> = ({ date, className }) => {
  const formattedDate = new Date(date).toLocaleDateString('es', {
    dateStyle: 'long',
  })
  return (
    <>
      <Text size='xs' className={className}>
        <time>{formattedDate}</time>
      </Text>
    </>
  )
}

export default DateText
