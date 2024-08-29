/**
 * v0 by Vercel.
 * @see https://v0.dev/t/puL0ot19yft
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Image from "next/image";
import Link from "next/link";
import AppIcon from "../components/shared/AppIcon";

export default function Component() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="bg-background px-4 py-3 shadow sm:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <AppIcon className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">WorkFlo</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/sign-up"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              prefetch={false}
            >
              Sign Up
            </Link>
            <Link
              href="/auth/sign-in"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Log In
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="bg-background py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 sm:gap-12 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-center space-y-6">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Streamline Your Workflow with WorkFlo
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Boost your productivity and stay organized with our powerful
                task management app.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/auth/sign-up"
                  className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  prefetch={false}
                >
                  Get Started
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:bg-muted hover:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  prefetch={false}
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/Home.svg"
                width="500"
                height="500"
                alt="WorkFlo Illustration"
                className="max-w-full rounded-lg object-contain"
                style={{ aspectRatio: "500/500", objectFit: "contain" }}
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-background py-4 text-sm text-zinc-400 font-mono">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:gap-0">
          <p>&copy; 2024 WorkFlo. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-foreground" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-foreground" prefetch={false}>
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

