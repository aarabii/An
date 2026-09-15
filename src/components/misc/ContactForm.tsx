"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight, Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step <= 4) {
      inputRef.current?.focus();
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

  const handleNext = () => {
    if (!validateStep()) return;
    if (step === 4) {
      setStep(5);
    } else {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNext();
    }
  };

  const handleBack = () => {
    setError("");
    if (step > 1 && step <= 4) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", reason: "", message: "" });
    setError("");
    setStep(1);
  };

  if (step === 5) {
    return (
      <div className="flex w-full flex-col items-center justify-center text-center py-8 gap-3 animate-in fade-in-50 duration-300">
        <div className="flex size-11 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Check className="size-5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-heading text-lg sm:text-xl font-bold text-foreground">
            Message Prepared
          </h4>
          <p className="font-para text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
            Thanks, {formData.name.split(" ")[0]}! Send handler is ready for
            integration.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="mt-3 font-mono text-xs active:scale-95"
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
              size="icon-xs"
              onClick={handleBack}
              aria-label="Previous step"
              className="size-6 text-muted-foreground hover:text-foreground active:scale-95"
            >
              <ArrowLeft className="size-3" />
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
      <label
        htmlFor={`contact-input-${step}`}
        className="font-heading text-base sm:text-xl font-semibold text-foreground transition-all duration-200"
      >
        {current.title}
      </label>

      {/* Minimalist Full-Width Underline Input Dock */}
      <div className="flex items-end gap-3 border-b border-border/70 pb-2 focus-within:border-foreground transition-colors duration-200">
        <Input
          ref={inputRef}
          id={`contact-input-${step}`}
          type={current.type}
          value={current.value}
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
          className="flex-1 bg-transparent py-1 font-para text-base sm:text-lg text-foreground placeholder:text-muted-foreground/40 focus:outline-none "
        />

        <Button
          type="button"
          size="icon-sm"
          variant={step === 4 ? "default" : "secondary"}
          onClick={handleNext}
          aria-label={step === 4 ? "Prepare message" : "Next step"}
          className="size-8 shrink-0 cursor-pointer transition-transform duration-150 active:scale-95"
        >
          {step === 4 ? (
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
          className="font-mono text-xs text-destructive animate-in fade-in-50 duration-150 pt-0.5"
        >
          {error}
        </p>
      )}
    </div>
  );
};
