import { Button } from "@/components/Button";
import { Link } from "react-router";

export default function ViewHome() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-slate-200 to-slate-50 flex items-center justify-center text-form-foreground">
      <div className="flex flex-col gap-4 w-full max-w-screen-sm">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold">Arief Rachmawan</h1>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/mbaharip"
              target="_blank"
              rel="noreferer noopener"
              className="text-form-primary font-medium hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://www.mbaharip.com"
              target="_blank"
              rel="noreferer noopener"
              className="text-form-primary font-medium hover:underline"
            >
              Portofolio
            </a>
            <a
              href="https://linkedin.com/in/mbaharip"
              target="_blank"
              rel="noreferer noopener"
              className="text-form-primary font-medium hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <hr className="border-t-2 border-form-muted-foreground" />

        <div className="flex items-center gap-4 w-full max-w-screen-sm">
          <Link to="/additional" className="grow">
            <Button className="w-full">Additional Test</Button>
          </Link>
          <Link to="/form" className="grow">
            <Button className="w-full">Form Page</Button>
          </Link>
          <Link to="/dashboard" className="grow">
            <Button className="w-full">Dashboard Page</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
