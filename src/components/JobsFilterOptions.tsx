import { type Option } from "@/components/ui/multiple-selector";

export const ROLEOPTIONS: Option[] = [
  { label: "Engineering", value: "engineering" },
  { label: "Design", value: "design" },
  { label: "Product", value: "product" },
  { label: "Science", value: "science" },
  { label: "Sales", value: "sales" },
  { label: "Marketing", value: "marketing" },
  { label: "Support", value: "support" },
  { label: "Operations", value: "operations" },
  { label: "Recruiting & HR", value: "hr" },
  { label: "Finance", value: "finance" },
  { label: "Legal", value: "legal" },
];

export const COMMITMENTOPTIONS: Option[] = [
  { label: "Full Time", value: "fulltime" },
  { label: "Internship", value: "internship" },
  { label: "Contract", value: "contract" },
];

export const SIZEOPTIONS: Option[] = [
  { label: "1-10 People", value: "sub10" },
  { label: "11-50 People", value: "sub50" },
  { label: "51-300 People", value: "sub300" },
  { label: "301+ People", value: "over300" },
];

export const EXPERIENCEOPTIONS: Option[] = [
  { label: "0-1 Year Exp", value: "0to1years" },
  { label: "1-3 Years Exp", value: "1to3years" },
  { label: "3-6 Years Exp", value: "3to6years" },
  { label: "6-12 Years Exp", value: "6to12years" },
  { label: "11+ Years Exp", value: "11plusyears" },
];

export const INDUSTYOPTIONS: Option[] = [
  { label: "B2B Software", value: "b2b" },
  { label: "Consumer", value: "consumer" },
  { label: "Education", value: "education" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Financial Technology", value: "financial" },
  { label: "Real Estate & Construction", value: "realestate" },
  { label: "Industrials", value: "industrials" },
  { label: "Government", value: "government" },
  { label: "Unspecified", value: "unspecified" },
];

export const STAGEOPTIONS: Option[] = [
  { label: "Seed", value: "seed" },
  { label: "Series A", value: "seriesa" },
  { label: "Growth", value: "growth" },
  { label: "Scale", value: "scale" },
];

export const REMOTEOPTIONS: Option[] = [
  { label: "Remote Only", value: "remoteOnly" },
  { label: "Remote OK", value: "remoteOk" },
  { label: "In Person", value: "inPerson" },
];

export const DEMOGRAPHOTYPEOPTIONS: Option[] = [
  { label: "Black Founders", value: "blackfounders" },
  { label: "Women Founders", value: "womenfounders" },
  { label: "Latinx Founders", value: "latinxfounders" },
];
