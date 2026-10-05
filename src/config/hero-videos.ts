import embersVideo from "../assets/brasas.mp4";

export interface HeroVideoConfig {
  label: string;
  source: string;
}

export const HERO_VIDEO: HeroVideoConfig = {
  label: "Brasas",
  source: embersVideo,
};
