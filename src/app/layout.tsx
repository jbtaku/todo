import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher";
import { Todo } from "@prisma/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vimo",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["prefetch"],
    queryFn: async () => {
      return await fetcher<Todo[]>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/todo`,
        {
          next: { tags: ["test"] },
        }
      );
    },
  });
  const a = dehydrate(queryClient);
  return (
    <html lang="ja">
      <body className={`${inter.className} text-slate-700 bg-slate-100`}>
        <div className="w-[92%] max-w-[1024px] mx-auto mt-3 xs:mt-7 xs:w-[88%] sm:mt-9">
          <Provider dehydratedState={a}>
            <Header />
            <div className="mt-12">{children}</div>
          </Provider>
        </div>
      </body>
    </html>
  );
}
