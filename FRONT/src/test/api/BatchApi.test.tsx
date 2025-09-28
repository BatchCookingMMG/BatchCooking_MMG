import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchBatch } from "@/features/batch/api/batchApi";
import { BatchResponseDTO } from "@/features/batch/types/BatchTypes";

const mockLogInfo = vi.fn();
const mockLogWarn = vi.fn();
const mockLogError = vi.fn();

vi.mock("@/core/logging/logger", () => ({
    logInfo: (...args: any[]) => mockLogInfo(...args),
    logWarn: (...args: any[]) => mockLogWarn(...args),
    logError: (...args: any[]) => mockLogError(...args),
}));

describe("fetchBatch", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("retourne les données quand la réponse est OK", async () => {
        const mockData: BatchResponseDTO = {
            mutualizedSteps: [],
            recipes: [],
            shopping_list: {},
        };

        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const result = await fetchBatch([1, 2, 3]);
        expect(result).toEqual(mockData);
        expect(mockLogInfo).toHaveBeenCalled();
    });

    it("lance une erreur quand la réponse n’est pas OK", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            status: 500,
            text: async () => "Erreur serveur",
        });

        await expect(fetchBatch([1])).rejects.toThrow("Erreur backend (500)");
        expect(mockLogWarn).toHaveBeenCalled();
        expect(mockLogError).toHaveBeenCalled();
    });
});
