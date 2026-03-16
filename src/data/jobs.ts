
export interface Job {
    id: string;
    title: string;
    location: string;
    type: "Full-time" | "Part-time" | "Locum";
    salary: string;
    description: string;
    postedDate: string;
}

export const jobs: Job[] = [
    {
        id: "1",
        title: "Qualified Dental Nurse",
        location: "Central London",
        type: "Full-time",
        salary: "£28,000 - £32,000 per annum",
        description: "We are looking for a dedicated and experienced Dental Nurse to join a prestigious practice in Central London. The ideal candidate will be GDC registered and have excellent patient care skills.",
        postedDate: "2024-03-15"
    },
    {
        id: "2",
        title: "Locum Dental Nurse",
        location: "North London",
        type: "Locum",
        salary: "£16 - £18 per hour",
        description: "Flexible locum shifts available across North London. Weekly pay and flexible hours to suit your schedule. perfect for those looking for work-life balance.",
        postedDate: "2024-03-18"
    },
    {
        id: "3",
        title: "Trainee Dental Nurse",
        location: "East London",
        type: "Full-time",
        salary: "£12 - £13 per hour",
        description: "An exciting opportunity for a Trainee Dental Nurse to join a supportive team. Full training provided with college enrollment support.",
        postedDate: "2024-03-20"
    }
];
