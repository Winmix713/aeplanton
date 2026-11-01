import React from 'react';
import { MotionConfig } from 'framer-motion';
import { GameScreen } from './components/game/GameScreen';
import { LanguageProvider } from './contexts/LanguageContext';

interface AppProps {
  /** Open on the title screen, or jump straight into a seeded Engineer · Jezero run. */
  startScreen?: 'title' | 'game';
  /** Start with the bottom mission-data drawer expanded. */
  drawerDefaultOpen?: boolean;
  /** Vibration feedback on supported devices. Independent of reduced motion. */
  hapticsEnabled?: boolean;
  /** Interface language on first visit. A choice made in-app is remembered on the device. */
  defaultLanguage?: 'en' | 'hu';
}

export function App({ startScreen = 'title', drawerDefaultOpen = false, hapticsEnabled = true, defaultLanguage = 'en' }: AppProps) {
  return (
    <LanguageProvider defaultLang={defaultLanguage}>
      <MotionConfig reducedMotion="user">
        <GameScreen startScreen={startScreen} drawerDefaultOpen={drawerDefaultOpen} hapticsEnabled={hapticsEnabled} />
      </MotionConfig>
    </LanguageProvider>);

}