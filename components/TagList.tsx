import { FunctionalComponent } from 'preact';
import Text from './Text.tsx';
import { colors } from '../constants/color.ts';
import { TagType } from '../types/posts.d.ts';

interface TagListProps {
  tags: TagType[];
}

const TagList: FunctionalComponent<TagListProps> = ({ tags }) => {
  return (
    <ul class='flex gap-2'>
      {tags.map((tag) => {
        const color = colors[tag] || '#FFF';
        return (
          <li key={tag}>
            <Text size='sm' className={`text-[${color}] font-bold`}>
              #{tag}
            </Text>
          </li>
        );
      })}
    </ul>
  );
};

export default TagList;
