import {
  useCreateLabels,
  useGetAllLabels,
  useSearchLabels,
} from "@/hooks/useQueryHook/useLabels.ts";
import LoadingSpin from "@/components/ui/LoadingSpin.tsx";
import MyLabelListItem from "./MyLabelListItem.tsx";
import AddNewLabelButton from "./AddNewLabelButton.tsx";
import type {Label, LabelsResponse} from "@/types/label.type.ts";
import { shouldShowLabel } from "@/helpers/handleCommasTag.ts";
import { useDebounce } from "@/hooks/useDebounce.ts";
import {queryClient} from "@/main.tsx";

type MyTaskLabelsDropdownProps = {
  selectedLabels: Label[];
  onSelect: (label: Label) => void;
  keyword: string;
  onCloseLabelsDropdown: () => void;
};
const MyTaskLabelsDropdown = ({
  selectedLabels,
  onSelect,
  keyword, onCloseLabelsDropdown
}: MyTaskLabelsDropdownProps) => {
  const {mutate} = useCreateLabels()
  const debouncedKeyword = useDebounce(keyword, 500);
  const { data: labels, isLoading } = useGetAllLabels();
  const { data: searchedLabels, isLoading: isSearching } =
    useSearchLabels(debouncedKeyword);
  const results = debouncedKeyword
    ? searchedLabels?.results
    : (labels?.results ?? []);
  const filteredLabels =
    results?.filter((label) =>
      shouldShowLabel(label, selectedLabels, debouncedKeyword),
    ) ?? [];

  const handleCreateLabel = () => {
    mutate({
      name: keyword
    }, {
      onSuccess: (_, __, context) => {
        if(!context?.tempId) return;
        const labels = queryClient.getQueryData<LabelsResponse>(["labels"])
        const newLabel = labels?.results.find(label => label.id === context.tempId)
        if(newLabel){
          onSelect(newLabel);
        }
        onCloseLabelsDropdown()
      }
    })

  }
  if (isLoading || isSearching) {
    return <LoadingSpin />;
  }
  return (
    <div
      id={"label-listbox"}
      role={"listbox"}
      aria-labelledby={"label-trigger"}
      className={
        "absolute top-full z-1000 border border-product-library-divider-primary rounded-large shadow-sm overflow-y-auto scrollbar-thin scrollbar-custom w-195.5 bg-white mt-1"
      }
    >
      {filteredLabels.length > 0 ? (
        <>
          {filteredLabels.map((label) => (
            <MyLabelListItem
              key={label.id}
              label={label}
              onSelectLabel={onSelect}
            />
          ))}
          <AddNewLabelButton />
        </>
      ) : (
        <button
          type={"button"}
          onClick={handleCreateLabel}
          className={
            "w-full text-start text-sm py-1 px-4 hover:bg-product-library-selectable-secondary-hover-fill"
          }
        >
          Label not found.{" "}
          <span className={"font-semibold"}>Create {keyword}</span>
        </button>
      )}
    </div>
  );
};

export default MyTaskLabelsDropdown;
