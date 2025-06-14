 export interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

export interface NavbarProps {
   logo?: {
     icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
     url: string
     title: string;
   };
   menu?: MenuItem[];
   auth?: {
     login: {
       title: string;
       url: string;
     };
     signup: {
       title: string;
       url: string;
     };
   };
 }
 
 
