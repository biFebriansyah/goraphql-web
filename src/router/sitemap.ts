import { IconType } from 'react-icons';
import {
  AiOutlineProduct,
  AiOutlineDotChart,
  AiOutlineTool,
  AiOutlineQuestion,
} from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';

interface MenuItem {
  name: string;
  tolink?: string;
  icons: IconType;
  main?: boolean;
}

export const ListNav: MenuItem[] = [
  {
    name: 'User',
    icons: FiUsers,
    tolink: '/users',
    main: true,
  },
  {
    name: 'Product',
    icons: AiOutlineProduct,
    tolink: '/product',
    main: true,
  },
  {
    name: 'Ads',
    icons: AiOutlineDotChart,
    tolink: '/ads',
    main: false,
  },
  {
    name: 'Settings',
    icons: AiOutlineTool,
    tolink: '/setting',
    main: false,
  },
  {
    name: 'Helps',
    icons: AiOutlineQuestion,
    tolink: '/help',
    main: false,
  },
];
