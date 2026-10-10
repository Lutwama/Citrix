import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
  FaLink,
} from "react-icons/fa6";

// lucide-react no longer ships brand logos, so socials use react-icons.
const ICONS: Record<string, IconType> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
  tiktok: FaTiktok,
  youtube: FaYoutube,
};

export function SocialIcon({ platform, size = 16 }: { platform: string; size?: number }) {
  const Icon = ICONS[platform] ?? FaLink;
  return <Icon size={size} />;
}
