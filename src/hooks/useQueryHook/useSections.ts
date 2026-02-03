import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Section,
  SectionPayload,
  SectionResponse,
  UpdateSectionPayload,
} from "../../types/section.type.ts";
import {
  apiAddNewSection,
  apiDeleteSection,
  apiGetAllSections,
  apiGetASection,
  apiUpdateSection,
} from "../../services/section.service.ts";
import type { ApiError, SyncResponse } from "../../types/api.type.ts";
import {
  optimisticAddSection,
  optimisticDeleteSection,
  optimisticUpdateSection,
  rollbackOptimisticUpdates,
  type OptimisticUpdatesContext,
} from "../../helpers/optimisticUpdates.ts";

export const useGetAllSections = () => {
  return useQuery<SectionResponse>({
    queryKey: ["section"],
    queryFn: apiGetAllSections,
  });
};

export const useGetASection = (id: string | null | undefined) => {
  return useQuery<Section>({
    queryKey: ["section-detail", id],
    queryFn: () => apiGetASection(id),
  });
};

export const useAddSection = () => {
  const queryClient = useQueryClient();
  return useMutation<
    SyncResponse,
    ApiError,
    SectionPayload,
    OptimisticUpdatesContext
  >({
    mutationFn: apiAddNewSection,
    onMutate: async (newSection) => {
      const tempId = `temp-section-${crypto.randomUUID()}`;
      const optimisticSection: Section = {
        id: tempId,
        name: newSection.name,
        project_id: newSection.project_id,
      };
      const res = optimisticAddSection({
        queryClient,
        queryKey: ["section"],
        optimisticSection,
      });
      return { ...res, tempId };
    },
    onSuccess: (res, _, context) => {
      const realId = res.temp_id_mapping?.[context.tempId!];
      if (!realId) return;
      queryClient.setQueryData<SectionResponse>(["section"], (old) => {
        if (!old) return old;
        return {
          ...old,
          results: old.results.map((section) =>
            section.id === context.tempId
              ? { ...section, id: realId }
              : section,
          ),
        };
      });
    },
    onError: (_, __, context) => {
      rollbackOptimisticUpdates({
        queryClient,
        queryKey: ["section"],
        context,
      });
    },
    onSettled: (error) => {
      if (error) {
        void queryClient.invalidateQueries({ queryKey: ["section"] });
      }
    },
  });
};

export const useUpdateSection = () => {
  const queryClient = useQueryClient();
  return useMutation<
    SyncResponse,
    ApiError,
    UpdateSectionPayload,
    OptimisticUpdatesContext
  >({
    mutationFn: apiUpdateSection,
    onMutate: async (updatedSection) => {
      return optimisticUpdateSection({
        queryClient,
        queryKey: ["section"],
        sectionId: updatedSection.id,
        optimisticSection: {
          name: updatedSection.name,
          project_id: updatedSection.project_id,
        },
      });
    },
    onError: (_, __, context) => {
      rollbackOptimisticUpdates({
        queryClient,
        queryKey: ["section"],
        context,
      });
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ["section"] });
    },
  });
};

export const useDeleteSection = () => {
  const queryClient = useQueryClient();
  return useMutation<
    null,
    ApiError,
    { sectionId: string },
    OptimisticUpdatesContext
  >({
    mutationFn: ({ sectionId }) => apiDeleteSection(sectionId),
    onMutate: async ({ sectionId }) => {
      return optimisticDeleteSection({
        queryClient,
        queryKey: ["section"],
        sectionId,
      });
    },
    onError: (_, __, context) => {
      rollbackOptimisticUpdates({
        queryClient,
        queryKey: ["section"],
        context,
      });
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ["section"] });
    },
  });
};
