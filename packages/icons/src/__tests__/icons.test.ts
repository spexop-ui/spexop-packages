import { describe, expect, it } from "vitest";
import * as Icons from "../index.js";
import {
  AlertIcons,
  AlertIconsSolid,
  type AlertIconVariant,
} from "../alert.js";
import {
  NavigationIcons,
  type NavigationIconVariant,
} from "../navigation.js";
import { ActionIcons, type ActionIconVariant } from "../actions.js";
import { UIIcons, type UIIconVariant } from "../ui.js";
import { FileIcons, type FileIconVariant } from "../files.js";
import {
  CommunicationIcons,
  type CommunicationIconVariant,
} from "../communication.js";
import { SocialIcons, type SocialIconVariant } from "../social.js";

describe("Icons Package", () => {
  describe("Package Structure", () => {
    it("should export icons from all categories", () => {
      expect(Icons).toBeDefined();
      expect(typeof Icons).toBe("object");
    });

    it("should export icon category mappings", () => {
      expect(AlertIcons).toBeDefined();
      expect(NavigationIcons).toBeDefined();
      expect(ActionIcons).toBeDefined();
      expect(UIIcons).toBeDefined();
      expect(FileIcons).toBeDefined();
      expect(CommunicationIcons).toBeDefined();
      expect(SocialIcons).toBeDefined();
    });
  });

  describe("SVG Format Validation", () => {
    it("all icons should be valid SVG strings", () => {
      const allIcons = Object.entries(Icons).filter(
        ([key, value]) =>
          typeof value === "string" &&
          !key.includes("Icons") &&
          !key.includes("Variant")
      );

      expect(allIcons.length).toBeGreaterThan(0);

      for (const [iconName, iconValue] of allIcons) {
        expect(typeof iconValue).toBe("string");
        expect(iconValue).toContain("<svg");
        expect(iconValue).toContain("</svg>");
        expect(iconValue).toContain("viewBox");
        expect(iconValue).toContain("xmlns");
      }
    });

    it("all icons should have proper ARIA attributes", () => {
      const allIcons = Object.entries(Icons).filter(
        ([key, value]) =>
          typeof value === "string" &&
          !key.includes("Icons") &&
          !key.includes("Variant")
      );

      for (const [iconName, iconValue] of allIcons) {
        expect(iconValue).toContain('role="img"');
        expect(iconValue).toContain("aria-label");
        expect(iconValue).toContain('focusable="false"');
      }
    });

    it("all icons should use proper viewBox format", () => {
      const allIcons = Object.entries(Icons).filter(
        ([key, value]) =>
          typeof value === "string" &&
          !key.includes("Icons") &&
          !key.includes("Variant")
      );

      const viewBoxRegex = /viewBox="(\d+\s+\d+\s+\d+\s+\d+)"/;

      for (const [iconName, iconValue] of allIcons) {
        expect(iconValue).toMatch(viewBoxRegex);
      }
    });

    it("all icons should be properly formed XML", () => {
      const allIcons = Object.entries(Icons).filter(
        ([key, value]) =>
          typeof value === "string" &&
          !key.includes("Icons") &&
          !key.includes("Variant")
      );

      for (const [iconName, iconValue] of allIcons) {
        // Should not have unclosed tags
        const openTags = iconValue.match(/<[^/][^>]*>/g) || [];
        const closeTags = iconValue.match(/<\/[^>]+>/g) || [];
        const selfClosingTags = iconValue.match(/<[^>]*\/>/g) || [];

        // Basic check: should have balanced tags
        expect(
          openTags.length - selfClosingTags.length
        ).toBeGreaterThanOrEqual(closeTags.length);
      }
    });
  });

  describe("Alert Icons", () => {
    it("should export all standard alert icons", () => {
      expect(Icons.InfoIcon).toBeDefined();
      expect(Icons.SuccessIcon).toBeDefined();
      expect(Icons.WarningIcon).toBeDefined();
      expect(Icons.ErrorIcon).toBeDefined();
    });

    it("should export all solid alert icons", () => {
      expect(Icons.InfoIconSolid).toBeDefined();
      expect(Icons.SuccessIconSolid).toBeDefined();
      expect(Icons.WarningIconSolid).toBeDefined();
      expect(Icons.ErrorIconSolid).toBeDefined();
    });

    it("should have AlertIcons mapping", () => {
      expect(AlertIcons.info).toBe(Icons.InfoIcon);
      expect(AlertIcons.success).toBe(Icons.SuccessIcon);
      expect(AlertIcons.warning).toBe(Icons.WarningIcon);
      expect(AlertIcons.error).toBe(Icons.ErrorIcon);
    });

    it("should have AlertIconsSolid mapping", () => {
      expect(AlertIconsSolid.info).toBe(Icons.InfoIconSolid);
      expect(AlertIconsSolid.success).toBe(Icons.SuccessIconSolid);
      expect(AlertIconsSolid.warning).toBe(Icons.WarningIconSolid);
      expect(AlertIconsSolid.error).toBe(Icons.ErrorIconSolid);
    });

    it("alert icons should have descriptive ARIA labels", () => {
      expect(Icons.InfoIcon).toContain("Information");
      expect(Icons.SuccessIcon).toContain("Success");
      expect(Icons.WarningIcon).toContain("Warning");
      expect(Icons.ErrorIcon).toContain("Error");
    });
  });

  describe("Navigation Icons", () => {
    it("should export all navigation icons", () => {
      expect(Icons.ArrowRightIcon).toBeDefined();
      expect(Icons.ArrowLeftIcon).toBeDefined();
      expect(Icons.ArrowUpIcon).toBeDefined();
      expect(Icons.ArrowDownIcon).toBeDefined();
      expect(Icons.ChevronRightIcon).toBeDefined();
      expect(Icons.ChevronLeftIcon).toBeDefined();
      expect(Icons.ChevronUpIcon).toBeDefined();
      expect(Icons.ChevronDownIcon).toBeDefined();
      expect(Icons.MenuIcon).toBeDefined();
      expect(Icons.CloseIcon).toBeDefined();
      expect(Icons.HomeIcon).toBeDefined();
      expect(Icons.ExternalLinkIcon).toBeDefined();
    });

    it("should have NavigationIcons mapping", () => {
      expect(NavigationIcons.arrowRight).toBe(Icons.ArrowRightIcon);
      expect(NavigationIcons.home).toBe(Icons.HomeIcon);
      expect(NavigationIcons.menu).toBe(Icons.MenuIcon);
    });
  });

  describe("Action Icons", () => {
    it("should export all action icons", () => {
      expect(Icons.SearchIcon).toBeDefined();
      expect(Icons.PlusIcon).toBeDefined();
      expect(Icons.EditIcon).toBeDefined();
      expect(Icons.DeleteIcon).toBeDefined();
      expect(Icons.SettingsIcon).toBeDefined();
      expect(Icons.CopyIcon).toBeDefined();
      expect(Icons.DownloadIcon).toBeDefined();
      expect(Icons.UploadIcon).toBeDefined();
      expect(Icons.FilterIcon).toBeDefined();
      expect(Icons.RefreshIcon).toBeDefined();
      expect(Icons.MoreHorizontalIcon).toBeDefined();
      expect(Icons.MoreVerticalIcon).toBeDefined();
    });

    it("should have ActionIcons mapping", () => {
      expect(ActionIcons.search).toBe(Icons.SearchIcon);
      expect(ActionIcons.plus).toBe(Icons.PlusIcon);
      expect(ActionIcons.edit).toBe(Icons.EditIcon);
      expect(ActionIcons.delete).toBe(Icons.DeleteIcon);
    });
  });

  describe("UI Icons", () => {
    it("should export all UI icons", () => {
      expect(Icons.CheckIcon).toBeDefined();
      expect(Icons.XIcon).toBeDefined();
      expect(Icons.HeartIcon).toBeDefined();
      expect(Icons.HeartFilledIcon).toBeDefined();
      expect(Icons.StarIcon).toBeDefined();
      expect(Icons.StarFilledIcon).toBeDefined();
      expect(Icons.EyeIcon).toBeDefined();
      expect(Icons.EyeOffIcon).toBeDefined();
      expect(Icons.LockIcon).toBeDefined();
      expect(Icons.UnlockIcon).toBeDefined();
      expect(Icons.UserIcon).toBeDefined();
      expect(Icons.UsersIcon).toBeDefined();
      expect(Icons.BellIcon).toBeDefined();
      expect(Icons.CalendarIcon).toBeDefined();
      expect(Icons.ClockIcon).toBeDefined();
    });

    it("should have UIIcons mapping", () => {
      expect(UIIcons.check).toBe(Icons.CheckIcon);
      expect(UIIcons.heart).toBe(Icons.HeartIcon);
      expect(UIIcons.star).toBe(Icons.StarIcon);
      expect(UIIcons.user).toBe(Icons.UserIcon);
    });

    it("should have paired icons for toggles", () => {
      expect(Icons.EyeIcon).toBeDefined();
      expect(Icons.EyeOffIcon).toBeDefined();
      expect(Icons.LockIcon).toBeDefined();
      expect(Icons.UnlockIcon).toBeDefined();
      expect(Icons.HeartIcon).toBeDefined();
      expect(Icons.HeartFilledIcon).toBeDefined();
      expect(Icons.StarIcon).toBeDefined();
      expect(Icons.StarFilledIcon).toBeDefined();
    });
  });

  describe("File Icons", () => {
    it("should export all file icons", () => {
      expect(Icons.FileIcon).toBeDefined();
      expect(Icons.FileTextIcon).toBeDefined();
      expect(Icons.FolderIcon).toBeDefined();
      expect(Icons.FolderOpenIcon).toBeDefined();
      expect(Icons.ImageIcon).toBeDefined();
      expect(Icons.CodeIcon).toBeDefined();
      expect(Icons.DatabaseIcon).toBeDefined();
      expect(Icons.ArchiveIcon).toBeDefined();
      expect(Icons.BookmarkIcon).toBeDefined();
      expect(Icons.BookmarkFilledIcon).toBeDefined();
    });

    it("should have FileIcons mapping", () => {
      expect(FileIcons.file).toBe(Icons.FileIcon);
      expect(FileIcons.folder).toBe(Icons.FolderIcon);
      expect(FileIcons.image).toBe(Icons.ImageIcon);
      expect(FileIcons.code).toBe(Icons.CodeIcon);
    });
  });

  describe("Communication Icons", () => {
    it("should export all communication icons", () => {
      expect(Icons.MailIcon).toBeDefined();
      expect(Icons.MessageCircleIcon).toBeDefined();
      expect(Icons.MessageSquareIcon).toBeDefined();
      expect(Icons.PhoneIcon).toBeDefined();
      expect(Icons.VideoIcon).toBeDefined();
      expect(Icons.SendIcon).toBeDefined();
      expect(Icons.ShareIcon).toBeDefined();
      expect(Icons.LinkIcon).toBeDefined();
      expect(Icons.AtSignIcon).toBeDefined();
    });

    it("should have CommunicationIcons mapping", () => {
      expect(CommunicationIcons.mail).toBe(Icons.MailIcon);
      expect(CommunicationIcons.messageCircle).toBe(Icons.MessageCircleIcon);
      expect(CommunicationIcons.send).toBe(Icons.SendIcon);
      expect(CommunicationIcons.share).toBe(Icons.ShareIcon);
    });
  });

  describe("Social Icons", () => {
    it("should export all social icons", () => {
      expect(Icons.GitHubIcon).toBeDefined();
      expect(Icons.TwitterIcon).toBeDefined();
      expect(Icons.LinkedInIcon).toBeDefined();
      expect(Icons.FacebookIcon).toBeDefined();
      expect(Icons.InstagramIcon).toBeDefined();
      expect(Icons.YouTubeIcon).toBeDefined();
      expect(Icons.SlackIcon).toBeDefined();
      expect(Icons.FigmaIcon).toBeDefined();
    });

    it("should have SocialIcons mapping", () => {
      expect(SocialIcons.github).toBe(Icons.GitHubIcon);
      expect(SocialIcons.twitter).toBe(Icons.TwitterIcon);
      expect(SocialIcons.linkedin).toBe(Icons.LinkedInIcon);
      expect(SocialIcons.facebook).toBe(Icons.FacebookIcon);
    });
  });

  describe("Naming Conventions", () => {
    it("all icon exports should follow PascalCase with Icon suffix", () => {
      const iconExports = Object.keys(Icons).filter(
        (key) => !key.includes("Icons") && !key.includes("Variant")
      );

      for (const iconName of iconExports) {
        expect(iconName).toMatch(/^[A-Z][a-zA-Z]*Icon(Solid|Filled)?$/);
      }
    });

    it("icon mappings should use camelCase keys", () => {
      const alertKeys = Object.keys(AlertIcons);
      for (const key of alertKeys) {
        expect(key).toMatch(/^[a-z][a-zA-Z]*$/);
      }

      const navKeys = Object.keys(NavigationIcons);
      for (const key of navKeys) {
        expect(key).toMatch(/^[a-z][a-zA-Z]*$/);
      }
    });
  });

  describe("Category-specific Exports", () => {
    it("should support category-specific imports", () => {
      expect(AlertIcons).toBeDefined();
      expect(AlertIconsSolid).toBeDefined();
      expect(NavigationIcons).toBeDefined();
      expect(ActionIcons).toBeDefined();
      expect(UIIcons).toBeDefined();
      expect(FileIcons).toBeDefined();
      expect(CommunicationIcons).toBeDefined();
      expect(SocialIcons).toBeDefined();
    });

    it("should have all icons accessible through mappings", () => {
      expect(Object.keys(AlertIcons).length).toBeGreaterThan(0);
      expect(Object.keys(NavigationIcons).length).toBeGreaterThan(0);
      expect(Object.keys(ActionIcons).length).toBeGreaterThan(0);
      expect(Object.keys(UIIcons).length).toBeGreaterThan(0);
      expect(Object.keys(FileIcons).length).toBeGreaterThan(0);
      expect(Object.keys(CommunicationIcons).length).toBeGreaterThan(0);
      expect(Object.keys(SocialIcons).length).toBeGreaterThan(0);
    });
  });

  describe("TypeScript Types", () => {
    it("should have proper type exports", () => {
      // These imports at top will fail if types aren't exported correctly
      const alertVariant: AlertIconVariant = "info";
      const navVariant: NavigationIconVariant = "home";
      const actionVariant: ActionIconVariant = "search";
      const uiVariant: UIIconVariant = "check";
      const fileVariant: FileIconVariant = "file";
      const commVariant: CommunicationIconVariant = "mail";
      const socialVariant: SocialIconVariant = "github";

      expect(alertVariant).toBe("info");
      expect(navVariant).toBe("home");
      expect(actionVariant).toBe("search");
    });
  });

  describe("Icon Consistency", () => {
    it("all icons should have consistent structure", () => {
      const allIcons = Object.entries(Icons).filter(
        ([key, value]) =>
          typeof value === "string" &&
          !key.includes("Icons") &&
          !key.includes("Variant")
      );

      for (const [iconName, iconValue] of allIcons) {
        // Should start with <svg and end with </svg>
        expect(iconValue).toMatch(/^<svg/);
        expect(iconValue).toMatch(/<\/svg>$/);

        // Should have required attributes
        expect(iconValue).toContain("viewBox");
        expect(iconValue).toContain("xmlns");
        expect(iconValue).toContain('role="img"');
        expect(iconValue).toContain("aria-label");
        expect(iconValue).toContain('focusable="false"');
      }
    });

    it("no icons should have id attributes (to avoid conflicts)", () => {
      const allIcons = Object.entries(Icons).filter(
        ([key, value]) =>
          typeof value === "string" &&
          !key.includes("Icons") &&
          !key.includes("Variant")
      );

      for (const [iconName, iconValue] of allIcons) {
        expect(iconValue).not.toContain(' id="');
      }
    });
  });
});

