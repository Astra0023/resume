export const profile = {
  name: "Jhon Carlos C. Tamba",
  role: "Software Engineer",
  location: "Mandaluyong City, Philippines",
  email: "jhon.carlos.cortez.tamba@gmail.com",
  objective:
    "Motivated and detail-oriented Software Engineer with expertise in full-stack development, backend systems, and modern web technologies, building reliable products that move businesses forward.",
};

export interface Job {
  role: string;
  company: string;
  period: string;
  location: string;
  points: string[];
}

export const experience: Job[] = [
  {
    role: "Software Engineer",
    company: "Arch Global Services Philippines Inc.",
    period: "Oct 2023 – Present",
    location: "Taguig City",
    points: [
      "Developed Activity Resource Tracker using MudBlazor, SignalR, and SQL.",
      "Contributed to Master Data Management systems using React, TypeScript, GraphQL, and C#.",
      "Implemented backend logic integrated with Snowflake, Azure EventGrid, Service Bus, and Hangfire.",
      "Contributed to CVT (Contract Validation Tool System) using React, TypeScript, C# .NET, Cosmos DB, and Argos.",
    ],
  },
  {
    role: "Junior Software Developer",
    company: "TemaroTech",
    period: "Aug 2023 – Sep 2023",
    location: "Makati",
    points: [
      "Built internal tools for managing accounts, suppliers, and user roles (Vue.js, Laravel).",
      "Designed dashboard features for real-time visitor and chat monitoring.",
    ],
  },
  {
    role: "IT Support",
    company: "CDC Manufacturing Corp.",
    period: "Sep 2022 – Feb 2023",
    location: "Malabon",
    points: [
      "Developed web-based tools for managing employee, supplier, and product data.",
      "Provided tech support: OS troubleshooting, device repair, network setup, printer servicing.",
    ],
  },
];

export const skills: Record<string, string[]> = {
  Frontend: [
    "React.js",
    "Vue.js",
    "TypeScript",
    "JavaScript",
    "MudBlazor",
    "DevExpress",
  ],
  Backend: ["Laravel (PHP)", "ASP.NET", "C#", "Java"],
  Database: ["MySQL", "SQL Server", "Snowflake", "Cosmos DB"],
  "Tools & Services": [
    "GraphQL",
    "SignalR",
    "Event Grid",
    "Azure Service Bus",
    "Hangfire",
    "Azure Key Vault",
    "Azure Blob Storage",
    "Azure DevOps",
    "Argos",
    "GitHub",
  ],
  Other: [
    "Microsoft Office",
    "Adobe Photoshop",
    "Hardware & Software Troubleshooting",
    "Network Setup",
  ],
};

export const education = [
  {
    school: "Quezon City University",
    degree: "BS in Information Technology",
    period: "2019 – 2023",
  },
  {
    school: "Electron College",
    degree: "Senior High School — ICT",
    period: "2016 – 2018",
  },
  {
    school: "San Bartolome High School",
    degree: "Junior High School",
    period: "2012 – 2016",
  },
];

export const projects = [
  {
    title: "Expenses Manager",
    stack: ["React", "TypeScript", "React Native", "Expo", "Vite"],
    text: "A privacy-focused expense manager for tracking spending, budgets, reports, and reminders across web and mobile. Your data stays encrypted on your device.",
    liveUrl: "https://expenses-manager-pi-five.vercel.app/",
  },
  {
    title: "Master Data Management",
    stack: ["React", "TypeScript", "GraphQL", "C#"],
    text: "Enterprise MDM platform with a typed React front end over GraphQL and C# services.",
  },
  {
    title: "Contract Validation Tool (CVT)",
    stack: ["React", "TypeScript", ".NET", "Cosmos DB", "Argos"],
    text: "Contract validation system backed by .NET APIs and Cosmos DB.",
  },
  {
    title: "Activity Resource Tracker",
    stack: ["MudBlazor", "SignalR", "SQL"],
    text: "Real-time activity and resource tracking built with Blazor and SignalR.",
  },
  {
    title: "Cloud Integration Backend",
    stack: ["Snowflake", "Event Grid", "Service Bus", "Hangfire"],
    text: "Event-driven backend logic and background jobs integrated with Snowflake and Azure messaging.",
  },
];
