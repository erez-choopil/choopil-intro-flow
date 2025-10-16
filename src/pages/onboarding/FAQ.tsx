import { Phone, Clock, Headphones } from "lucide-react";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const benefits = [
  {
    icon: Phone,
    text: "Grow your business while your AI answers calls 24/7",
  },
  {
    icon: Clock,
    text: "7-day trial with all features",
  },
  {
    icon: Headphones,
    text: "Our support team is here for you and ready to help",
  },
];

export default function FAQ() {
  const navigate = useNavigate();

  return (
    <OnboardingLayout currentStep={2} hideNavigation>
      <div className="grid lg:grid-cols-[1.2fr,1fr] gap-16 items-start max-w-6xl mx-auto">
        {/* Left Side - Benefits & Testimonial */}
        <div className="space-y-10">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-foreground leading-tight">
              Claim <span className="text-primary">Your Custom</span> AI Receptionist
            </h1>
          </div>

          <div className="space-y-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-foreground text-lg leading-relaxed pt-1.5">
                    {benefit.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 pt-6">
            <blockquote className="text-lg text-foreground/90 italic border-l-4 border-primary pl-6">
              "The AI receptionist handles calls professionally and never misses a beat. It&apos;s like having a dedicated team member available 24/7."
            </blockquote>
            <div className="flex items-center gap-3 pl-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                B
              </div>
              <div>
                <p className="font-semibold text-foreground">Business Owner</p>
                <p className="text-sm text-muted-foreground">Professional Services</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground">
              Create Your Account
            </h2>
            <p className="text-muted-foreground text-lg">
              Free for 7 days
            </p>
          </div>

          <div className="space-y-4">
            <Button
              type="button"
              variant="outline"
              className="w-full h-14 text-base"
              onClick={() => navigate("/dashboard")}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-2 text-muted-foreground">
                  or
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-14 text-base"
              onClick={() => navigate("/dashboard")}
            >
              Continue with Email
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground px-4">
            By creating an account, you agree with our Privacy Policy and Terms of Service.
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
}