import Container from "./container";
import { EXAMPLE_PATH } from "../lib/constants";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" border-t border-[#111] bg-[#060606]">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h5 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Statically Generated with Next.js.
          </h5>
          <div className="flex flex-col gap-6 lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <Link
              href="/contact"
              className="btn__primary"
            >
              Contact
            </Link>
            <a
              href={`https://github.com/vercel/next.js/tree/canary/examples/${EXAMPLE_PATH}`}
              className="btn__outline"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
