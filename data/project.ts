export interface Project {
  title: string;
  shortTitle?: string;
  tech: string;
  description: string;
  link: string;
  image?: string;
}

export const projects: Project[] = [
  {
    title: "Computerized Maintenance Management System (CMMS)",
    shortTitle: "CMMS.TEL",
    tech: "Java Spring, Next.js, PostgreSQL",
    description:
      "Enterprise industrial platform automating preventive maintenance cycles, equipment inspection schedules, and operational audit workflows at scale.",
    link: "https://github.com/milhamafif027/CMMS_PM",
    image: "/gambarProject/cmms.png",
  },
  {
    title: "Batik Motif Classification via EfficientNet-B3",
    shortTitle: "BATIK.AI",
    tech: "PyTorch, Streamlit, Computer Vision",
    description:
      "High-accuracy deep learning recognition engine leveraging selective fine-tuning and regularization to classify intricate traditional Indonesian batik motifs.",
    link: "https://klasifikasi-motif-batik.streamlit.app/",
    image: "/gambarProject/klasifikasiBatik.png",
  },
  {
    title: "Integrated Enterprise Portal for UMKM Patemon",
    shortTitle: "PATEMON.HUB",
    tech: "Next.js, Tailwind CSS, Vercel",
    description:
      "A modern local-business digital directory engineered to enhance regional economic visibility with performant responsive UI and static optimization.",
    link: "https://umkm-patemon.vercel.app/",
    image: "/gambarProject/Screenshot 2025-12-28 171505.png",
  },
  {
    title: "Asuh Bersama: Collaborative Childcare Platform",
    shortTitle: "ASUH.APP",
    tech: "Flutter, Supabase, PostgreSQL",
    description:
      "A cross-platform mobile ecosystem built to streamline social parenting records, health monitoring, and distributed community care logistics.",
    link: "https://github.com/milhamafif027/Asuh-Bersama",
    image: "/gambarProject/asuhBersama.png",
  },
  {
    title: "Pancasila Adventure: Gamified Learning Engine",
    shortTitle: "PANCASILA.EDU",
    tech: "Next.js, React, Tailwind CSS",
    description:
      "Interactive pedagogical quiz web application featuring real-time score state management to increase engagement in elementary civics education.",
    link: "https://pancasila-adventure.vercel.app/",
    image: "/gambarProject/pancasila.png",
  },
  {
    title: "Yulizar ATK: Retail Commerce Platform",
    shortTitle: "YULIZAR.STORE",
    tech: "Next.js, Tailwind CSS, Vercel",
    description:
      "A lightweight, responsive commercial landing site built for a retail office supplies distributor, focusing on seamless product discovery and fast conversion.",
    link: "https://yulizar-atk.vercel.app/",
    image: "/gambarProject/yulizarAtk.png",
  },
];
