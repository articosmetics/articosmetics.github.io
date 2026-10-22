export type AvailabilityType = 'available' | 'limited' | 'unavailable';

export interface AvailabilityItem {
  type: string;
  color: string;
  pulse?: boolean;
}

export interface StatItem {
  value: number | null;
  suffix?: string;
  display?: string;
  label: string;
}

export interface AboutItem {
  iconName?: string;
  label: string;
  value?: string;
}

export interface AboutCategory {
  category: string;
  items: AboutItem[];
}

export interface ProjectItem {
  title: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
  players?: string | null;
  image: string;
  link?: string;
  website?: string | null;
  ip?: string | null;
  ongoing?: boolean;
  problems?: string[];
  pricingLink?: boolean;
  discordLabel?: string;
}

export interface SoftwareProject {
  title: string;
  tagline: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  githubUrl: string;
  badge?: string;
  highlights: string[];
}

export interface TechCategory {
  name: string;
  items: string[];
}

export interface CodeToken {
  text: string;
  cls: 'kw' | 'tp' | 'vr' | 'fn' | 'st' | 'cm' | 'an' | 'pl';
}

export interface PrivacySection {
  title: string;
  content?: string;
  bullets?: Array<{ label: string; text: string }>;
}

export interface PortfolioConfig {
  meta: {
    title: string;
    description: string;
    themeColor: string;
    avatarUrl?: string;
  };
  hero: {
    tagline: string;
    name: string;
    roles: string[];
    roleDescription: string;
    primaryCta: {
      text: string;
      href: string;
    };
    secondaryCta: {
      text: string;
      href: string;
    };
  };
  stats: StatItem[];
  availability: AvailabilityItem[];
  about: AboutCategory[];
  projects: ProjectItem[];
  softwareProjects?: SoftwareProject[];
  technologies: TechCategory[];
  contact: {
    badge: string;
    heading: string[];
    subheading: string;
    discordUsername: string;
    discordId: string;
    discordUrl: string;
    githubUrl: string;
    email?: string;
  };
  privacyPolicy: {
    lastUpdated: string;
    notice: string;
    sections: PrivacySection[];
  };
  backgroundCode: CodeToken[][];
}
