import {dateFilterData} from "@/data/myTaskFilter.data.ts";
import {buildDateFilterQuery} from "./groupSortTasks.ts";

export const extractByPrefixFromList = (
  criteria: string[],
  matcher: (value: string) => boolean,
) => {
  const results: string[] = [];
  criteria.forEach((c) => {
    // at least 1 prefix
    if (c.startsWith("(") && c.endsWith(")")) {
      c.slice(1, -1)
        .split("|")
        .map((l) => l.trim())
        .forEach((l) => {
          if (matcher(l)) {
            results.push(l);
          }
        });
    }
    // single prefix
    else if (matcher(c)) {
      results.push(c);
    }
  });
  return results;
};

export const extractLabelsFromList = (criteria: string[]) =>
  extractByPrefixFromList(criteria, (value) => value.startsWith("@"));
export const extractPrioritiesFromList = (criteria: string[]) =>
  extractByPrefixFromList(criteria, (value) => /^p[1-4]$/.test(value));

export const isDateCriteria = (value: string) => {
  const dateQueries = dateFilterData.map(d => buildDateFilterQuery(d.key)).filter(Boolean);
  return dateQueries.includes(value)
}

export const extractDateFromList = (criteria: string[]) => {
  const matched = criteria.find(c => isDateCriteria(c))
  return matched ?? null
}