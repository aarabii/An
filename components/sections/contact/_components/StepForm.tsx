"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { isValidEmail } from "@/lib/validators";

interface FormData {
  senderEmail: string;
  senderName: string;
  reasonToContact: string;
  senderMsg: string;
}

const STEPS = [
  {
    id: "email",
    label: "Step 1/4",
    placeholder: "[ enter email address ]",
    type: "email",
  },
  {
    id: "name",
    label: "Step 2/4",
    placeholder: "[ enter your name ]",
    type: "text",
  },
  {
    id: "reason",
    label: "Step 3/4",
    placeholder: "[ reason for contacting ]",
    type: "text",
  },
  {
    id: "message",
    label: "Step 4/4",
    placeholder: "[ write your message... ]",
    type: "textarea",
  },
];

export const StepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    senderEmail: "",
    senderName: "",
    reasonToContact: "",
    senderMsg: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentStepConfig = STEPS[currentStep];

  const getCurrentValue = () => {
    switch (currentStep) {
      case 0:
        return formData.senderEmail;
      case 1:
        return formData.senderName;
      case 2:
        return formData.reasonToContact;
      case 3:
        return formData.senderMsg;
      default:
        return "";
    }
  };

  const updateCurrentValue = (val: string) => {
    setError(null);
    setFormData((prev) => {
      switch (currentStep) {
        case 0:
          return { ...prev, senderEmail: val };
        case 1:
          return { ...prev, senderName: val };
        case 2:
          return { ...prev, reasonToContact: val };
        case 3:
          return { ...prev, senderMsg: val };
        default:
          return prev;
      }
    });
  };

  const validateStep = (): boolean => {
    const value = getCurrentValue().trim();
    if (!value) {
      setError("Please fill out this field");
      return false;
    }
    if (currentStep === 0) {
      if (!isValidEmail(value)) {
        setError("Please enter a valid email address");
        return false;
      }
    }
    setError(null);
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setError(null);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentStepConfig.type !== "textarea") {
      e.preventDefault();
      handleNext();
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setIsSubmitted(true);
      toast.success("Message sent successfully! 🚀", {
        description: "Your message has landed in my inbox. I'll reply soon!",
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      setError(errorMessage);
      toast.error("Failed to send message", {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      senderEmail: "",
      senderName: "",
      reasonToContact: "",
      senderMsg: "",
    });
    setCurrentStep(0);
    setIsSubmitted(false);
    setError(null);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-start gap-2 py-4 text-left font-mono"
      >
        <p className="text-xs text-muted-foreground">
          I will get back to you as soon as possible.
        </p>
        <button
          onClick={resetForm}
          className="mt-1 text-xs underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-md flex flex-col gap-2">
      {/* Top progress indicator & back button */}
      <div className="flex items-center justify-between text-xs font-mono text-muted-foreground/60 mb-1">
        <span className="tracking-wider">{currentStepConfig.label}</span>
        {currentStep > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            disabled={isSubmitting}
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3" />
            <span>back</span>
          </button>
        )}
      </div>

      {/* Input container matching reference image style */}
      <div className="relative border-b border-border/80 pb-2 focus-within:border-accent transition-colors">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            {currentStepConfig.type === "textarea" ? (
              <textarea
                value={getCurrentValue()}
                onChange={(e) => updateCurrentValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    handleNext();
                  }
                }}
                placeholder={currentStepConfig.placeholder}
                rows={2}
                disabled={isSubmitting}
                className="w-full bg-transparent font-mono text-sm text-foreground/90 placeholder:text-muted-foreground/40 outline-none resize-none"
              />
            ) : (
              <input
                type={currentStepConfig.type}
                value={getCurrentValue()}
                onChange={(e) => updateCurrentValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={currentStepConfig.placeholder}
                disabled={isSubmitting}
                className="w-full bg-transparent font-mono text-sm text-foreground/90 placeholder:text-muted-foreground/40 outline-none"
              />
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="shrink-0 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all disabled:opacity-50"
              title={currentStep === STEPS.length - 1 ? "Send message" : "Next step"}
            >
              {isSubmitting ? (
                <Loader2 className="size-4 animate-spin text-accent" />
              ) : (
                <ArrowRight className="size-4" />
              )}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Error display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-xs font-mono text-destructive mt-1"
        >
          <AlertCircle className="size-3.5 shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Helper hint for textarea step */}
      {currentStep === 3 && !error && (
        <span className="text-[10px] font-mono text-muted-foreground/40 mt-0.5">
          Press Ctrl+Enter or click arrow to send
        </span>
      )}
    </div>
  );
};
