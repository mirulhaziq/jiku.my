import { Hero } from '@/components/sections/Hero';
import { Journey } from '@/components/sections/Journey';
import { Work } from '@/components/sections/Work';
import { FlagshipProjects } from '@/components/sections/FlagshipProjects';
import { MoreProjects } from '@/components/sections/MoreProjects';
import { Roadmap } from '@/components/sections/Roadmap';
import { Blog } from '@/components/sections/Blog';
import { LinkedInActivity } from '@/components/sections/LinkedInActivity';
import { GitHubActivity } from '@/components/sections/GitHubActivity';
import { TechStack } from '@/components/sections/TechStack';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Journey />
      <Work />
      <FlagshipProjects />
      <MoreProjects />
      <Roadmap />
      <Blog />
      <LinkedInActivity />
      <GitHubActivity />
      <TechStack />
      <Contact />
    </main>
  );
}
