interface NavbarItemProps {
  label: string;
}

const NavbarItem: React.FC<NavbarItemProps> = (props) => {
  const { label } = props;
  return (
    <div className="text-white cursor-pointer hover:text-gray-300 transition">
      {label}
    </div>
  );
};

export default NavbarItem;
