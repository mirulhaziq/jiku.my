import { Hero } from '@/components/sections/Hero';
import { Journey } from '@/components/sections/Journey';
import { Work } from '@/components/sections/Work';
import { FlagshipProjects } from '@/components/sections/FlagshipProjects';
import { Roadmap } from '@/components/sections/Roadmap';
import { Blog } from '@/components/sections/Blog';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Journey />
      <Work />
      <FlagshipProjects />
      <Roadmap />
      <Blog />
      <Contact />
    </main>
  );
}
