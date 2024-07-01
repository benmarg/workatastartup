"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, type FC } from "react";
import {
  COMMITMENTOPTIONS,
  DEMOGRAPHOTYPEOPTIONS,
  EXPERIENCEOPTIONS,
  INDUSTYOPTIONS,
  REMOTEOPTIONS,
  ROLEOPTIONS,
  SIZEOPTIONS,
  STAGEOPTIONS,
} from "./JobsFilterOptions";
import { Input } from "./ui/input";
import MultipleSelector, { type Option } from "./ui/multiple-selector";

const JobsFilterContainer: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string | Option[]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (Array.isArray(value)) {
        params.delete(name);
        value.forEach((v) => params.append(name, v.value));
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="col-span-2 flex h-[90vh] flex-col justify-start gap-4 bg-beigelight p-4">
      <h1 className="text-2xl font-medium">Filter</h1>
      <div className="flex flex-col gap-2 text-lg font-medium">
        <div>
          <label className="text-sm font-medium">Search</label>
          <Input
            placeholder="Search by Job Title, Company Name..."
            className="bg-white"
            onChange={(e) => {
              router.push(
                pathname + "?" + createQueryString("search", e.target.value),
              );
              router.refresh();
            }}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Role</label>
          <MultipleSelector
            className="bg-white"
            placeholder="Any"
            options={ROLEOPTIONS}
            emptyIndicator="The option you're looking for does not exist."
            hidePlaceholderWhenSelected
            onChange={(value) => {
              router.push(pathname + "?" + createQueryString("role", value));
              router.refresh();
            }}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Commitment</label>
          <MultipleSelector
            className="bg-white"
            placeholder="Any"
            options={COMMITMENTOPTIONS}
            emptyIndicator="The option you're looking for does not exist."
            hidePlaceholderWhenSelected
            onChange={(value) => {
              router.push(
                pathname + "?" + createQueryString("commitment", value),
              );
              router.refresh();
            }}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Company Size</label>
          <MultipleSelector
            className="bg-white"
            placeholder="Any"
            options={SIZEOPTIONS}
            emptyIndicator="The option you're looking for does not exist."
            hidePlaceholderWhenSelected
            onChange={(value) => {
              router.push(
                pathname + "?" + createQueryString("companysize", value),
              );
              router.refresh();
            }}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Industry</label>
          <MultipleSelector
            className="bg-white"
            placeholder="Any"
            options={INDUSTYOPTIONS}
            emptyIndicator="The option you're looking for does not exist."
            hidePlaceholderWhenSelected
            onChange={(value) => {
              router.push(
                pathname + "?" + createQueryString("industry", value),
              );
              router.refresh();
            }}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Experience</label>
          <MultipleSelector
            className="bg-white"
            placeholder="Any"
            options={EXPERIENCEOPTIONS}
            emptyIndicator="The option you're looking for does not exist."
            hidePlaceholderWhenSelected
            onChange={(value) => {
              router.push(
                pathname + "?" + createQueryString("experience", value),
              );
              router.refresh();
            }}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Location</label>
          <Input
            className="bg-white"
            placeholder="Search..."
            onChange={(e) => {
              router.push(
                pathname + "?" + createQueryString("location", e.target.value),
              );
              router.refresh();
            }}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Remote</label>
          <MultipleSelector
            className="bg-white"
            placeholder="Any"
            options={REMOTEOPTIONS}
            emptyIndicator="The option you're looking for does not exist."
            hidePlaceholderWhenSelected
            onChange={(value) => {
              router.push(pathname + "?" + createQueryString("remote", value));
              router.refresh();
            }}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Company Stage</label>
          <MultipleSelector
            className="bg-white"
            placeholder="Any"
            options={STAGEOPTIONS}
            emptyIndicator="The option you're looking for does not exist."
            hidePlaceholderWhenSelected
            onChange={(value) => {
              router.push(pathname + "?" + createQueryString("stage", value));
              router.refresh();
            }}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Founder Demographic</label>
          <MultipleSelector
            className="bg-white"
            placeholder="Any"
            options={DEMOGRAPHOTYPEOPTIONS}
            emptyIndicator="The option you're looking for does not exist."
            hidePlaceholderWhenSelected
            onChange={(value) => {
              router.push(
                pathname + "?" + createQueryString("demographic", value),
              );
              router.refresh();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default JobsFilterContainer;
