import { MutualizedStepDTO } from "@/features/batch/types/BatchTypes";

type MutualizedStepsProps = {
    steps: MutualizedStepDTO[];
};

const MutualizedSteps = ({ steps }: MutualizedStepsProps) => {
    return (
        <div className="flex flex-col gap-6 w-full">
            {steps.map((step, index) => (
                <div
                    key={index}
                    className="bg-[#FDF8F4] border border-[#E6DCD2] rounded-xl p-6 shadow-sd w-full"
                >
                    <div className="text-lg font-semibold mb-3">
                        {step.category}
                    </div>

                    <ul className="list-disc list-inside space-y-1 text-base text-gray-700 ml-4">
                        {step.steps.map((instruction, i) => (
                            <li key={i}>{instruction}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default MutualizedSteps;
