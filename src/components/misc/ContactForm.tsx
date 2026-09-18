"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormData {
  name: string;
  email: string;
  reason: string;
  message: string;
}

export const ContactForm = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    reason: "",
    message: "",
  });
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [lastSentTime, setLastSentTime] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (step <= 4) {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [step]);

  const validateStep = (): boolean => {
    setError("");
    if (step === 1) {
      if (!formData.name.trim()) {
        setError("Please enter your name.");
        return false;
      }
    } else if (step === 2) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim()) {
        setError("Please enter your email.");
        return false;
      }
      if (!emailRegex.test(formData.email.trim())) {
        setError("Please enter a valid email address.");
        return false;
      }
    } else if (step === 3) {
      if (!formData.reason.trim()) {
        setError("Please enter a topic or reason.");
        return false;
      }
    } else if (step === 4) {
      if (!formData.message.trim()) {
        setError("Please enter your message.");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    if (lastSentTime) {
      const elapsed = Date.now() - lastSentTime;
      if (elapsed < 30000) {
        const remaining = Math.ceil((30000 - elapsed) / 1000);
        setError(`Please wait ${remaining}s before sending another message.`);
        return;
      }
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_name: formData.name.trim(),
          sender_email: formData.email.trim(),
          sender_message: formData.message.trim(),
          sender_reason: formData.reason.trim(),
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const errorMsg =
          data?.error?.message ||
          data?.error ||
          "Failed to send email. Please try again or reach out directly at hello@aarab.me.";
        const resolvedError =
          typeof errorMsg === "string"
            ? errorMsg
            : "Failed to send email. Please try again.";

        setError(resolvedError);

        // If error is related to email or domain, automatically navigate back to Step 2 (Email)
        if (
          resolvedError.toLowerCase().includes("email") ||
          resolvedError.toLowerCase().includes("domain")
        ) {
          setStep(2);
        }
        return;
      }

      setLastSentTime(Date.now());
      setStep(5);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (isSubmitting) return;
    if (!validateStep()) return;
    if (step === 4) {
      handleSubmit();
    } else {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isSubmitting) {
      e.preventDefault();
      handleNext();
    }
  };

  const handleBack = () => {
    if (isSubmitting) return;
    setError("");
    if (step > 1 && step <= 4) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", reason: "", message: "" });
    setError("");
    setIsSubmitting(false);
    setStep(1);
  };

  if (step === 5) {
    return (
      <div className="flex w-full flex-col items-center justify-center text-center py-8 gap-3 animate-in fade-in-50 duration-150">
        <div className="flex size-11 items-center justify-center rounded-full bg-success/10 text-success border border-success/20">
          <Check className="size-5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-heading text-lg sm:text-xl font-bold text-foreground">
            Message Sent
          </h4>
          <p className="font-para text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
            Thanks, {formData.name.split(" ")[0]}! I received your note and a
            confirmation email has been sent to {formData.email}.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="mt-3 font-mono text-xs"
        >
          Send another message
        </Button>
      </div>
    );
  }

  const stepsConfig = [
    {
      title: "What's your name?",
      placeholder: "Your name or team",
      type: "text",
      value: formData.name,
      field: "name" as const,
    },
    {
      title: "Where should I reply?",
      placeholder: "name@company.com",
      type: "email",
      value: formData.email,
      field: "email" as const,
    },
    {
      title: "What's on your mind?",
      placeholder: "Project inquiry, collaboration, advice...",
      type: "text",
      value: formData.reason,
      field: "reason" as const,
    },
    {
      title: "Your message",
      placeholder: "Tell me a little about your project or idea...",
      type: "text",
      value: formData.message,
      field: "message" as const,
    },
  ];

  const current = stepsConfig[step - 1];

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Header: Title and Step Counter */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {step > 1 && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={isSubmitting}
              onClick={handleBack}
              aria-label="Previous step"
              className="size-8 text-muted-foreground hover:text-foreground disabled:opacity-50"
            >
              <ArrowLeft className="size-4" />
            </Button>
          )}
          <span className="font-heading text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Drop a Line
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <span className="text-foreground font-semibold">0{step}</span>
          <span className="text-muted-foreground/40">/</span>
          <span>04</span>
        </div>
      </div>

      {/* Active Question Prompt */}
      <Label
        htmlFor={`contact-input-${step}`}
        className="font-heading text-base sm:text-xl font-semibold text-foreground transition-colors duration-150"
      >
        {current.title}
      </Label>

      {/* Minimalist Full-Width Underline Input Dock */}
      <div
        className={`flex items-end gap-3 border-b pb-2 transition-colors duration-150 ${
          error
            ? "border-destructive focus-within:border-destructive"
            : "border-border focus-within:border-foreground"
        }`}
      >
        <Input
          ref={inputRef}
          id={`contact-input-${step}`}
          type={current.type}
          value={current.value}
          disabled={isSubmitting}
          onChange={(e) => {
            setError("");
            setFormData((prev) => ({
              ...prev,
              [current.field]: e.target.value,
            }));
          }}
          onKeyDown={handleKeyDown}
          placeholder={current.placeholder}
          aria-invalid={!!error}
          autoFocus={false}
          className="flex-1 bg-transparent py-1 font-mono text-base tracking-widest sm:text-lg text-foreground placeholder:text-muted-foreground/40 border-0 rounded-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 disabled:opacity-50"
        />

        <Button
          type="button"
          size="icon"
          variant={step === 4 ? "default" : "secondary"}
          onClick={handleNext}
          disabled={isSubmitting}
          aria-label={step === 4 ? "Send message" : "Next step"}
          className="size-8 shrink-0 cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : step === 4 ? (
            <Send className="size-4" />
          ) : (
            <ArrowRight className="size-4" />
          )}
        </Button>
      </div>

      {/* Error display if validation fails */}
      {error && (
        <p
          role="alert"
          className="font-para text-sm text-destructive animate-in fade-in-50 duration-150 mt-1"
        >
          {error}
        </p>
      )}
    </div>
  );
};
