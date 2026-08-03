import { Hero } from '@/components/sections/Hero';
import { Journey } from '@/components/sections/Journey';
import { FlagshipProjects } from '@/components/sections/FlagshipProjects';
import { MoreProjects } from '@/components/sections/MoreProjects';
import { Roadmap } from '@/components/sections/Roadmap';
import { Journal } from '@/components/sections/Journal';
import { LinkedInActivity } from '@/components/sections/LinkedInActivity';
import { GitHubActivity } from '@/components/sections/GitHubActivity';
import { TechStack } from '@/components/sections/TechStack';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Journey />
      <FlagshipProjects />
      <MoreProjects />
      <Roadmap />
      <Journal />
      <LinkedInActivity />
      <GitHubActivity />
      <TechStack />
      <Contact />
    </main>
  );
}
