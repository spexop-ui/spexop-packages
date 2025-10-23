/**
 * Specialized Card Examples
 *
 * Comprehensive examples showing how the enhanced Card component can replace
 * all specialized card components using composition patterns.
 *
 * This demonstrates the power of the Card primitive with specialized features
 * that cover all use cases previously handled by separate components.
 */

import {
  Calendar,
  Check,
  Clock,
  Eye,
  MapPin,
  ShoppingCart,
  Star,
} from "@spexop/icons";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@spexop/react";
import { Icon } from "../../indicators/Icon/Icon.js";

// ============================================
// SERVICE CARD REPLACEMENT
// ============================================

export function ServiceCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Default Service Card */}
      <Card variant="service" density="spacious">
        <CardHeader
          number="01"
          title="Primitives First"
          meta="Foundation → Features"
        />
        <CardBody>
          <p>
            Master five grid primitives before building complex layouts. Grid,
            Container, Stack, GridItem, and Spacer form the foundation.
          </p>
        </CardBody>
      </Card>

      {/* Featured Service Card */}
      <Card variant="featured" density="spacious">
        <CardHeader
          number="05"
          title="Composition Before Complexity"
          meta="Simplicity → Power"
        />
        <CardBody>
          <p>
            Build complex interfaces by composing simple, well-tested
            primitives. This approach ensures maintainability and scalability.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}

// ============================================
// PRICING CARD REPLACEMENT
// ============================================

export function PricingCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Starter Plan */}
      <Card variant="pricing" density="normal">
        <CardHeader title="Starter" subtitle="Perfect for individuals" />
        <CardBody price={0} currency="$" period="month">
          <ul className="space-y-2">
            <li className="flex items-center">
              <Icon name="Check" size="sm" className="text-green-500 mr-2" />
              Up to 5 projects
            </li>
            <li className="flex items-center">
              <Icon name="Check" size="sm" className="text-green-500 mr-2" />
              Basic support
            </li>
            <li className="flex items-center">
              <Icon name="Check" size="sm" className="text-green-500 mr-2" />
              1GB storage
            </li>
          </ul>
        </CardBody>
        <CardFooter
          primaryAction="Get Started"
          onPrimaryAction={() => console.log("Selected Starter")}
          primaryVariant="outline"
        />
      </Card>

      {/* Pro Plan (Popular) */}
      <Card variant="pricing" density="normal" className="relative">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge variant="success">
            <Icon name="Star" size="sm" />
            Most Popular
          </Badge>
        </div>
        <CardHeader title="Pro" subtitle="Perfect for growing businesses" />
        <CardBody price={29} currency="$" period="month">
          <ul className="space-y-2">
            <li className="flex items-center">
              <Icon name="Check" size="sm" className="text-green-500 mr-2" />
              Unlimited projects
            </li>
            <li className="flex items-center">
              <Icon name="Check" size="sm" className="text-green-500 mr-2" />
              Priority support
            </li>
            <li className="flex items-center">
              <Icon name="Check" size="sm" className="text-green-500 mr-2" />
              10GB storage
            </li>
            <li className="flex items-center">
              <Icon name="Check" size="sm" className="text-green-500 mr-2" />
              Advanced analytics
            </li>
          </ul>
        </CardBody>
        <CardFooter
          primaryAction="Start Free Trial"
          onPrimaryAction={() => console.log("Selected Pro")}
          primaryVariant="primary"
        />
      </Card>

      {/* Enterprise Plan */}
      <Card variant="pricing" density="normal">
        <CardHeader title="Enterprise" subtitle="For large organizations" />
        <CardBody price={99} currency="$" period="month">
          <ul className="space-y-2">
            <li className="flex items-center">
              <Icon name="Check" size="sm" className="text-green-500 mr-2" />
              Everything in Pro
            </li>
            <li className="flex items-center">
              <Icon name="Check" size="sm" className="text-green-500 mr-2" />
              Custom integrations
            </li>
            <li className="flex items-center">
              <Icon name="Check" size="sm" className="text-green-500 mr-2" />
              Dedicated support
            </li>
            <li className="flex items-center">
              <Icon name="Check" size="sm" className="text-green-500 mr-2" />
              Unlimited storage
            </li>
          </ul>
        </CardBody>
        <CardFooter
          primaryAction="Contact Sales"
          onPrimaryAction={() => console.log("Selected Enterprise")}
          primaryVariant="outline"
        />
      </Card>
    </div>
  );
}

// ============================================
// PRODUCT CARD REPLACEMENT
// ============================================

export function ProductCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Product Card 1 */}
      <Card variant="product" density="normal">
        <CardBody
          image="/api/placeholder/300/200"
          imageAlt="Wireless Headphones"
          price={199}
          currency="$"
          rating={4.5}
          reviews={128}
          inStock={true}
        >
          <h3 className="font-semibold text-lg mb-2">Wireless Headphones</h3>
          <p className="text-gray-600 mb-4">
            Premium noise-canceling wireless headphones with 30-hour battery
            life.
          </p>
        </CardBody>
        <CardFooter
          primaryAction="Add to Cart"
          onPrimaryAction={() => console.log("Added to cart")}
          secondaryAction="View Details"
          onSecondaryAction={() => console.log("View details")}
          primaryVariant="primary"
          secondaryVariant="ghost"
        />
      </Card>

      {/* Product Card 2 (Out of Stock) */}
      <Card variant="product" density="normal">
        <CardBody
          image="/api/placeholder/300/200"
          imageAlt="Smart Watch"
          price={299}
          currency="$"
          rating={4.8}
          reviews={256}
          inStock={false}
        >
          <h3 className="font-semibold text-lg mb-2">Smart Watch</h3>
          <p className="text-gray-600 mb-4">
            Advanced fitness tracking with heart rate monitoring and GPS.
          </p>
        </CardBody>
        <CardFooter
          primaryAction="Notify When Available"
          onPrimaryAction={() => console.log("Notify requested")}
          secondaryAction="View Details"
          onSecondaryAction={() => console.log("View details")}
          primaryVariant="outline"
          secondaryVariant="ghost"
          primaryDisabled={false}
        />
      </Card>

      {/* Product Card 3 */}
      <Card variant="product" density="normal">
        <CardBody
          image="/api/placeholder/300/200"
          imageAlt="Bluetooth Speaker"
          price={89}
          currency="$"
          rating={4.2}
          reviews={89}
          inStock={true}
        >
          <h3 className="font-semibold text-lg mb-2">Bluetooth Speaker</h3>
          <p className="text-gray-600 mb-4">
            Portable speaker with 360-degree sound and waterproof design.
          </p>
        </CardBody>
        <CardFooter
          primaryAction="Add to Cart"
          onPrimaryAction={() => console.log("Added to cart")}
          secondaryAction="View Details"
          onSecondaryAction={() => console.log("View details")}
          primaryVariant="primary"
          secondaryVariant="ghost"
        />
      </Card>
    </div>
  );
}

// ============================================
// TIMELINE CARD REPLACEMENT
// ============================================

export function TimelineCardExample() {
  return (
    <div className="space-y-4">
      {/* Upcoming Event */}
      <Card variant="timeline" density="normal">
        <CardHeader title="Product Launch Event" />
        <CardBody
          date="2025-02-15"
          time="2:00 PM"
          location="San Francisco, CA"
          status="upcoming"
        >
          <p>
            Join us for the official launch of our new product line. Live demos,
            Q&A session, and networking opportunities.
          </p>
        </CardBody>
        <CardFooter
          primaryAction="Register"
          onPrimaryAction={() => console.log("Registered")}
          secondaryAction="Add to Calendar"
          onSecondaryAction={() => console.log("Added to calendar")}
          primaryVariant="primary"
          secondaryVariant="ghost"
        />
      </Card>

      {/* Ongoing Event */}
      <Card variant="timeline" density="normal">
        <CardHeader title="Weekly Team Meeting" />
        <CardBody
          date="2025-01-20"
          time="10:00 AM"
          location="Conference Room A"
          status="ongoing"
        >
          <p>
            Regular team sync to discuss project progress, upcoming deadlines,
            and resource allocation.
          </p>
        </CardBody>
        <CardFooter
          primaryAction="Join Meeting"
          onPrimaryAction={() => console.log("Joined meeting")}
          primaryVariant="primary"
        />
      </Card>

      {/* Completed Event */}
      <Card variant="timeline" density="normal">
        <CardHeader title="Design Review Session" />
        <CardBody
          date="2025-01-15"
          time="3:00 PM"
          location="Design Studio"
          status="completed"
        >
          <p>
            Completed design review for the new user interface. All feedback has
            been incorporated and approved.
          </p>
        </CardBody>
        <CardFooter
          primaryAction="View Results"
          onPrimaryAction={() => console.log("Viewed results")}
          primaryVariant="ghost"
        />
      </Card>
    </div>
  );
}

// ============================================
// CTA CARD REPLACEMENT
// ============================================

export function CTACardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Newsletter Signup CTA */}
      <Card variant="highlighted" density="spacious">
        <CardHeader
          title="Stay Updated"
          subtitle="Get the latest news and updates"
        />
        <CardBody>
          <p>
            Subscribe to our newsletter and never miss important updates, new
            features, and industry insights.
          </p>
        </CardBody>
        <CardFooter
          align="center"
          primaryAction="Subscribe"
          onPrimaryAction={() => console.log("Subscribed")}
          secondaryAction="Learn More"
          onSecondaryAction={() => console.log("Learn more")}
          primaryVariant="primary"
          secondaryVariant="ghost"
        />
      </Card>

      {/* Trial Conversion CTA */}
      <Card variant="featured" density="spacious">
        <CardHeader
          title="Ready to Get Started?"
          subtitle="Join thousands of users building amazing products"
        />
        <CardBody>
          <p>
            Start your free trial today and experience the power of our
            platform. No credit card required.
          </p>
        </CardBody>
        <CardFooter
          align="center"
          primaryAction="Start Free Trial"
          onPrimaryAction={() => console.log("Started trial")}
          secondaryAction="View Pricing"
          onSecondaryAction={() => console.log("View pricing")}
          primaryVariant="primary"
          secondaryVariant="ghost"
        />
      </Card>
    </div>
  );
}

// ============================================
// DASHBOARD CARD REPLACEMENT
// ============================================

export function DashboardCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Loading State */}
      <Card
        variant="basic"
        density="compact"
        state="loading"
        loadingText="Loading analytics..."
      >
        <CardHeader title="Analytics Dashboard" />
        <CardBody>
          <p>Loading your analytics data...</p>
        </CardBody>
      </Card>

      {/* Error State */}
      <Card
        variant="basic"
        density="compact"
        state="error"
        errorMessage="Failed to load data"
      >
        <CardHeader title="User Activity" />
        <CardBody>
          <p>Unable to load user activity data. Please try again later.</p>
        </CardBody>
        <CardFooter
          primaryAction="Retry"
          onPrimaryAction={() => console.log("Retrying")}
          primaryVariant="primary"
        />
      </Card>

      {/* Success State */}
      <Card
        variant="basic"
        density="compact"
        state="success"
        successMessage="Data updated successfully"
      >
        <CardHeader title="Revenue Metrics" />
        <CardBody>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">$12,450</div>
            <div className="text-sm text-gray-600">+15% from last month</div>
          </div>
        </CardBody>
        <CardFooter
          primaryAction="View Details"
          onPrimaryAction={() => console.log("View details")}
          primaryVariant="ghost"
        />
      </Card>
    </div>
  );
}

// ============================================
// COMPREHENSIVE EXAMPLE SHOWCASE
// ============================================

export function AllSpecializedCardsShowcase() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-6">Service Cards</h2>
        <ServiceCardExample />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Pricing Cards</h2>
        <PricingCardExample />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Product Cards</h2>
        <ProductCardExample />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Timeline Cards</h2>
        <TimelineCardExample />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">CTA Cards</h2>
        <CTACardExample />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Dashboard Cards</h2>
        <DashboardCardExample />
      </div>
    </div>
  );
}
