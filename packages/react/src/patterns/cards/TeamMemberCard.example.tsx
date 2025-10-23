/**
 * TeamMemberCard Pattern - Team member profile display
 *
 * Replaces the specialized TeamMemberCard component removed in v0.4.0.
 * This composition pattern uses Card primitives to create a team member display.
 */

import { Avatar, Badge, Card, CardBody, CardHeader, Icon } from "@spexop/react";
import React from "react";
import styles from "./TeamMemberCard.example.module.css";

export interface TeamMemberCardProps {
  /** Member name */
  name: string;
  /** Member job title */
  jobTitle: string;
  /** Member bio */
  bio?: string;
  /** Member avatar URL */
  avatarUrl?: string;
  /** Member email */
  email?: string;
  /** Member skills */
  skills?: string[];
  /** Social links */
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  /** Card variant */
  variant?: "basic" | "interactive" | "elevated" | "outlined";
  /** Card density */
  density?: "compact" | "normal" | "spacious";
  /** Additional CSS class */
  className?: string;
}

export function TeamMemberCard({
  name,
  jobTitle,
  bio,
  avatarUrl,
  email,
  skills,
  socialLinks,
  variant = "basic",
  density = "normal",
  className,
}: TeamMemberCardProps) {
  return (
    <Card variant={variant} density={density} className={className}>
      <CardHeader>
        <div className={styles.memberHeader}>
          <Avatar
            name={name}
            src={avatarUrl}
            size="xl"
            className={styles.avatar}
          />
          <div className={styles.memberInfo}>
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.role}>{jobTitle}</p>
            {email && (
              <a href={`mailto:${email}`} className={styles.email}>
                {email}
              </a>
            )}
          </div>
        </div>
      </CardHeader>

      <CardBody>
        {bio && <p className={styles.bio}>{bio}</p>}

        {skills && skills.length > 0 && (
          <div className={styles.skills}>
            {skills.map((skill) => (
              <Badge key={skill} variant="info" size="sm">
                {skill}
              </Badge>
            ))}
          </div>
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
      </CardBody>
    </Card>
  );
}

// Usage example
export function TeamMemberCardExample() {
  return (
    <div className={styles.grid}>
      <TeamMemberCard
        name="Alex Rodriguez"
        jobTitle="Lead Developer"
        bio="Full-stack developer with 8+ years of experience building scalable web applications."
        avatarUrl="/images/alex-rodriguez.jpg"
        email="alex@company.com"
        skills={["React", "Node.js", "Python", "AWS"]}
        socialLinks={{
          github: "https://github.com/alexrodriguez",
          linkedin: "https://linkedin.com/in/alexrodriguez",
        }}
        variant="interactive"
      />
    </div>
  );
}
