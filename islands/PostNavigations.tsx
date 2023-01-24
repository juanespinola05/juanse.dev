import { useLayoutEffect, useState } from 'preact/hooks';

type SectionsType = Element[];

const PostNavigation = () => {
  const [sections, setSections] = useState<SectionsType>([]);

  useLayoutEffect(() => {
    const anchors = window.document.querySelectorAll('article h4');
    setSections([...anchors]);
  }, []);

  return (
    <div class='font-default p-2 max-w-[200px] text-xs'>
      <p class='text-sm font-bold mb-2'>Contenido</p>
      <ul class='list-inside flex flex-col gap-1'>
        {sections.map((section) => (
          <li key={section.id} class='hover:font-bold'>
            <a href={`#${section.id}`}>
              <span class='text-gray-300'>- &nbsp;</span>
              {section.textContent}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostNavigation;
