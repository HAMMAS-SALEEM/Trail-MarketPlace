export function DropdownMenu({ isOpen, children, mainClass }) {
  
    return (
      <>
        {isOpen && (
          <div className={`absolute z-10 backdrop-blur-[15px] right-0 top-5  max-w-max rounded-md shadow-gray-600  ring-1 ring-black ring-opacity-5 ${mainClass}`}>
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {children}
            </div>
          </div>
        )}
      </>
    );
  }
  
  
  export const MenuList = ({ children, icon, onClick, ...rest }) => {
    return (
      <p
        {...rest}
        onClick={onClick}
        className="flex cursor-pointer items-center gap-2 2xl:gap-3 font-lato_medium 2xl:px-5 px-3 py-2 2xl:py-[10px] min-w-max text-sm hover:bg-gray-100 hover:text-gray-900"
        role="menuitem"
      >
        {icon && <span>{icon}</span>}
        {children}
      </p>
    );
  };
  