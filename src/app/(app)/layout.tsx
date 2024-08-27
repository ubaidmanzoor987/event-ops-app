import Navbar from '@/components/navbar/Navbar';
import { ILayoutProps } from '@/lib/types';

const AppLayout = ({ children, ...props }: ILayoutProps) => {
  return <Navbar {...props}>{children}</Navbar>;
};

export default AppLayout;
