import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition';
import BrandStory from './BrandStory';
import MissionValues from './MissionValues';
import MilestonesTimeline from './MilestonesTimeline';
import PressLogos from './PressLogos';
import CareersCallout from './CareersCallout';

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <BrandStory />
        <MissionValues />
        <MilestonesTimeline />
        <PressLogos />
        <CareersCallout />
      </div>
    </PageTransition>
  );
}
