import { getAllProjects } from "@/lib/projects";
import HomeClient from "./HomeClient";

export default function Home() {
  const projects = getAllProjects();
  return <HomeClient projects={projects} />;
}
