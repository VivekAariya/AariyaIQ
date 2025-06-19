import { AlertCircle, CheckCircle, Circle, Clock } from "lucide-react";

type StepStatus = "completed" | "current" | "upcoming" | "error";

interface Step {
    id: number;
    name: string;
    status: StepStatus;
}

interface RegistrationStatusIndicatorProps {
    steps: Step[];
    currentStep?: number;
}

export function RegistrationStatusIndicator({ steps, currentStep }: RegistrationStatusIndicatorProps) {
    return (
        <div className="space-y-4">
            {steps.map((step, index) => (
                <div key={step.id} className="relative flex items-start">
                    {/* Connector line */}
                    {index < steps.length - 1 && (
                        <div className="absolute left-3.5 top-4 bottom-0 w-0.5 bg-gradient-to-b from-purple-600/50 to-cyan-500/50 h-full" />
                    )}

                    {/* Step icon */}
                    <div className="mr-3 flex h-7 w-7 flex-shrink-0 items-center justify-center">
                        {step.status === "completed" ? (
                            <CheckCircle className="h-7 w-7 text-green-500" />
                        ) : step.status === "current" ? (
                            <Clock className="h-7 w-7 text-purple-500 animate-pulse" />
                        ) : step.status === "error" ? (
                            <AlertCircle className="h-7 w-7 text-red-500" />
                        ) : (
                            <Circle className="h-7 w-7 text-gray-400" />
                        )}
                    </div>

                    {/* Step content */}
                    <div className="flex flex-col pb-6">
                        <span
                            className={`font-medium ${
                                step.status === "completed"
                                    ? "text-green-500"
                                    : step.status === "current"
                                      ? "text-purple-500"
                                      : step.status === "error"
                                        ? "text-red-500"
                                        : "text-gray-400"
                            }`}
                        >
                            {step.name}
                        </span>

                        {/* Step description based on status */}
                        <span className="text-xs text-gray-500">
                            {step.status === "completed"
                                ? "Completed"
                                : step.status === "current"
                                  ? "In progress"
                                  : step.status === "error"
                                    ? "Action required"
                                    : "Waiting"}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
