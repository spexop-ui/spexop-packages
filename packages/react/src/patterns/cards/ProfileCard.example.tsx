/**
 * ProfileCard Pattern Example
 *
 * Composition example showing how to build a team member or user profile card
 * using Card primitives and other Spexop components.
 *
 * This is NOT an exported component - it's a pattern example
 * that demonstrates composition techniques.
 */

import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Text,
} from "@spexop/react";
import type { ReactNode } from "react";

interface SocialLink {
  platform: string;
  url: string;
  icon?: ReactNode;
}

interface ProfileCardProps {
  name: string;
  title: string;
  bio: string;
  avatar?: string;
  location?: string;
  socialLinks?: SocialLink[];
  skills?: string[];
  onContact?: () => void;
  onViewProfile?: () => void;
}

export function ProfileCard({
  name,
  title,
  bio,
  avatar,
  location,
  socialLinks = [],
  skills = [],
  onContact,
  onViewProfile,
}: ProfileCardProps) {
  return (
    <Card variant="basic" density="normal" className="profile-card">
      <CardHeader>
        <div className="profile-header">
          <Avatar
            src={avatar}
            name={name}
            size="xl"
            className="profile-avatar"
          />
          <div className="profile-info">
            <h3 className="profile-name">{name}</h3>
            <Text size="lg" color="primary" className="profile-title">
              {title}
            </Text>
            {location && (
              <Text size="sm" color="secondary" className="profile-location">
                📍 {location}
              </Text>
            )}
          </div>
        </div>
      </CardHeader>

      <CardBody>
        <Text className="profile-bio" color="secondary">
          {bio}
        </Text>

        {skills.length > 0 && (
          <div className="profile-skills">
            <Text size="sm" weight="semibold" className="skills-label">
              Skills
            </Text>
            <div className="skills-list">
              {skills.map((skill) => (
                <Badge key={skill} variant="subtle" size="sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {socialLinks.length > 0 && (
          <div className="profile-social">
            <Text size="sm" weight="semibold" className="social-label">
              Connect
            </Text>
            <div className="social-links">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={`${link.platform} profile`}
                >
                  {link.icon || link.platform}
                </a>
              ))}
            </div>
          </div>
        )}
      </CardBody>

      {(onContact || onViewProfile) && (
        <CardFooter align="center">
          <div className="profile-actions">
            {onContact && (
              <Button
                variant="primary"
                size="sm"
                onClick={onContact}
                className="contact-button"
              >
                Contact
              </Button>
            )}
            {onViewProfile && (
              <Button
                variant="outline"
                size="sm"
                onClick={onViewProfile}
                className="profile-button"
              >
                View Profile
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

// Usage Example
export function ProfileCardExample() {
  return (
    <ProfileCard
      name="Sarah Johnson"
      title="Senior Frontend Developer"
      bio="Passionate about creating beautiful, accessible user interfaces. 5+ years experience with React, TypeScript, and design systems."
      avatar="/avatars/sarah-johnson.jpg"
      location="San Francisco, CA"
      socialLinks={[
        { platform: "GitHub", url: "https://github.com/sarahj", icon: "🐙" },
        {
          platform: "LinkedIn",
          url: "https://linkedin.com/in/sarahj",
          icon: "💼",
        },
        { platform: "Twitter", url: "https://twitter.com/sarahj", icon: "🐦" },
      ]}
      skills={["React", "TypeScript", "Design Systems", "Accessibility", "CSS"]}
      onContact={() => console.log("Contact Sarah")}
      onViewProfile={() => console.log("View Sarah's profile")}
    />
  );
}

// CSS for styling (add to your stylesheet)
/*
.profile-card {
  text-align: center;
  transition: all 0.2s ease;
}

.profile-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--theme-shadow-md);
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--theme-spacing-4);
}

.profile-avatar {
  border: 3px solid var(--theme-border);
}

.profile-info {
  text-align: center;
}

.profile-name {
  font-size: var(--theme-font-size-xl);
  font-weight: var(--theme-font-weight-bold);
  margin: 0 0 var(--theme-spacing-2) 0;
}

.profile-title {
  font-weight: var(--theme-font-weight-semibold);
  margin-bottom: var(--theme-spacing-1);
}

.profile-location {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--theme-spacing-1);
}

.profile-bio {
  line-height: 1.6;
  margin-bottom: var(--theme-spacing-4);
  text-align: left;
}

.profile-skills {
  margin-bottom: var(--theme-spacing-4);
  text-align: left;
}

.skills-label {
  margin-bottom: var(--theme-spacing-2);
  display: block;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--theme-spacing-2);
}

.profile-social {
  text-align: left;
}

.social-label {
  margin-bottom: var(--theme-spacing-2);
  display: block;
}

.social-links {
  display: flex;
  gap: var(--theme-spacing-3);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--theme-surface-hover);
  border: 2px solid var(--theme-border);
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.2s ease;
}

.social-link:hover {
  border-color: var(--theme-primary);
  background: var(--theme-primary);
  color: var(--theme-surface);
}

.profile-actions {
  display: flex;
  gap: var(--theme-spacing-3);
  width: 100%;
}

.contact-button,
.profile-button {
  flex: 1;
}
*/
