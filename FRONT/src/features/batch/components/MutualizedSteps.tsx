import { MutualizedStepDTO } from "@/features/batch/types/BatchTypes";

type MutualizedStepsProps = {
    steps: MutualizedStepDTO[];
};

const MutualizedSteps = ({ steps }: MutualizedStepsProps) => {
    return (
        <div className="flex flex-col items-center gap-6 px-4 sm:px-6 md:px-8">
            {steps.map((step, index) => (
                <div
                    key={index}
                    className="bg-[#edc59d] rounded-2xl p-5 sm:p-6 md:p-8 w-full max-w-md shadow-md"
                >
                    <div className="space-y-4">
                        <div className="text-base sm:text-lg md:text-xl font-semibold capitalize flex items-center gap-2">
                            {step.category}
                        </div>

                        <ul className="list-disc list-inside space-y-1 text-sm sm:text-base ml-2">
                            {step.steps.map((instruction, i) => (
                                <li key={i}>{instruction}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MutualizedSteps;
