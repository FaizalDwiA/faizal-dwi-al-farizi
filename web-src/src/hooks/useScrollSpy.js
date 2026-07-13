import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds, offset = 160) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    function handleScroll() {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      // Premium touch: If at the bottom of the page, force the last section to be active
      if (windowHeight + scrollPos >= scrollHeight - 60) {
        if (sectionIds.length > 0) {
          setActiveId(sectionIds[sectionIds.length - 1]);
        }
        return;
      }

      let current = '';
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const sectionTop = element.offsetTop - offset;
          const sectionHeight = element.offsetHeight;
          if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = id;
            break;
          }
        }
      }

      if (current) {
        setActiveId(current);
      } else if (sectionIds.length > 0 && scrollPos < 100) {
        setActiveId(sectionIds[0]);
      }
    }

    window.addEventListener('scroll', handleScroll);
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, offset]);

  return activeId;
}
