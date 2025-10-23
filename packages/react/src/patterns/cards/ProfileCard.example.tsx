/**
 * ProfileCard Pattern - User profile display
 *
 * Replaces the specialized ProfileCard component removed in v0.4.0.
 * This composition pattern uses Card primitives to create a user profile display.
 */

import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@spexop/react";
import React from "react";
import styles from "./ProfileCard.example.module.css";

export interface ProfileCardProps {
  /** User name */
  name: string;
  /** User title/role */
  title: string;
  /** User bio */
  bio?: string;
  /** Avatar image URL */
  avatarUrl?: string;
  /** User location */
  location?: string;
  /** User website */
  website?: string;
  /** Social links */
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  /** Skills/tags */
  skills?: string[];
  /** Follow button text */
  followText?: string;
  /** Follow handler */
  onFollow?: () => void;
  /** Message handler */
  onMessage?: () => void;
  /** Card variant */
  variant?: "basic" | "interactive" | "elevated" | "outlined";
  /** Card density */
  density?: "compact" | "normal" | "spacious";
  /** Additional CSS class */
  className?: string;
}

export function ProfileCard({
  name,
  title,
  bio,
  avatarUrl,
  location,
  website,
  socialLinks,
  skills,
  followText = "Follow",
  onFollow,
  onMessage,
  variant = "basic",
  density = "normal",
  className,
}: ProfileCardProps) {
  return (
    <Card variant={variant} density={density} className={className}>
      <CardHeader>
        <div className={styles.profileHeader}>
          <Avatar
            name={name}
            src={avatarUrl}
            size="xl"
            className={styles.avatar}
          />
          <div className={styles.profileInfo}>
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.title}>{title}</p>
            {location && <p className={styles.location}>{location}</p>}
          </div>
        </div>
      </CardHeader>

      <CardBody>
        {bio && <p className={styles.bio}>{bio}</p>}

        {website && (
          <a
            href={website}
            className={styles.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {website}
          </a>
        )}

        {socialLinks && (
          <div className={styles.socialLinks}>
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} className={styles.socialLink}>
                Twitter
              </a>
            )}
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} className={styles.socialLink}>
                LinkedIn
              </a>
            )}
            {socialLinks.github && (
              <a href={socialLinks.github} className={styles.socialLink}>
                GitHub
              </a>
            )}
          </div>
        )}

        {skills && skills.length > 0 && (
          <div className={styles.skills}>
            {skills.map((skill) => (
              <Badge key={skill} variant="info" size="sm">
                {skill}
              </Badge>
            ))}
          </div>
        )}
      </CardBody>

      <CardFooter>
        <div className={styles.actions}>
          {onFollow && (
            <Button
              variant="primary"
              size="sm"
              onClick={onFollow}
              className={styles.followButton}
            >
              {followText}
            </Button>
          )}
          {onMessage && (
            <Button
              variant="outline"
              size="sm"
              onClick={onMessage}
              className={styles.messageButton}
            >
              Message
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

// Usage example
export function ProfileCardExample() {
  return (
    <div className={styles.grid}>
      <ProfileCard
        name="Jane Doe"
        title="Senior Frontend Developer"
        bio="Passionate about creating beautiful and accessible user interfaces. Love working with React and TypeScript."
        avatarUrl="/images/jane-doe.jpg"
        location="San Francisco, CA"
        website="https://janedoe.dev"
        socialLinks={{
          twitter: "https://twitter.com/janedoe",
          linkedin: "https://linkedin.com/in/janedoe",
          github: "https://github.com/janedoe",
        }}
        skills={["React", "TypeScript", "CSS", "Node.js"]}
        followText="Follow"
        onFollow={() => console.log("Followed")}
        onMessage={() => console.log("Message sent")}
        variant="interactive"
      />
    </div>
  );
}
