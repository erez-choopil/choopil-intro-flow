import { Check } from "lucide-react";
import { SignupForm } from "@/components/auth/SignupForm";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";

const benefits = [
  "Grow your business while your AI answers calls 24/7",
  "Take messages and collect caller information automatically",
  "Book appointments and manage your calendar seamlessly",
  "Answer common questions with your trained AI receptionist",
  "Never miss an important call again",
];

export default function Signup() {
  return (
    <OnboardingLayout currentStep={2} hideNavigation>
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Side - Benefits Checklist */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground leading-tight">
              You&apos;re almost there!
            </h1>
            <p className="text-xl text-muted-foreground">
              Create your account to launch your AI receptionist
            </p>
          </div>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <p className="text-foreground text-lg leading-relaxed">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="lg:pl-8">
          <SignupForm />
        </div>
      </div>
    </OnboardingLayout>
  );
}
