import { Header } from "../header/header";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header></Header>
      <div className="content">{children}</div>
    </>
  );
}
