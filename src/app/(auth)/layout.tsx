interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <div className="container min-h-[80vh] flex items-center justify-center">{children}</div>;
}
