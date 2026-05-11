import { useState, useEffect } from 'react';
import FreelanceLanding from './FreelanceLanding.jsx';
import LinkedInAssets from './LinkedInAssets.jsx';
import GlowStudioDemo from './GlowStudioDemo.jsx';
import LinkedInSlides from './LinkedInSlides.jsx';

function getPage() {
  const h = window.location.hash;
  if (h === '#assets') return 'assets';
  if (h === '#glow')   return 'glow';
  if (h === '#slides') return 'slides';
  return 'landing';
}

export default function App() {
  const [page, setPage] = useState(getPage());

  useEffect(() => {
    const fn = () => setPage(getPage());
    window.addEventListener('hashchange', fn);
    return () => window.removeEventListener('hashchange', fn);
  }, []);

  if (page === 'assets') return <LinkedInAssets />;
  if (page === 'glow')   return <GlowStudioDemo />;
  if (page === 'slides') return <LinkedInSlides />;
  return <FreelanceLanding />;
}
